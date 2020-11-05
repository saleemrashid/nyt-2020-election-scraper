package main

import (
	"bufio"
	"bytes"
	"io"
	"os/exec"
	"strconv"
)

func gitRevList(arg ...string) [][]byte {
	out, err := exec.Command("git", arg...).Output()
	if err != nil {
		panic(err)
	}

	return bytes.Split(bytes.TrimSpace(out), []byte("\n"))
}

func gitReadBatched(filename string, batchSize int) chan []byte {
	commits := gitRevList("log", "--pretty=%H", "--reverse", "--", filename)
	ch := make(chan []byte, batchSize)

	go func() {
		defer close(ch)
		for _, commit := range commits {
			ch <- commit
		}
	}()

	return gitReadChannel(ch, filename)
}

func gitReadChannel(commits chan []byte, filename string) chan []byte {
	ch := make(chan []byte, len(commits))
	cmd := exec.Command("git", "cat-file", "--batch=%(objectsize)", "--buffer")

	stdin, err := cmd.StdinPipe()
	if err != nil {
		panic(err)
	}

	go func() {
		defer stdin.Close()
		tail := []byte(":" + filename + "\n")
		for commit := range commits {
			data := make([]byte, 0, len(commit)+len(tail))
			data = append(data, commit...)
			data = append(data, tail...)
			if _, err := stdin.Write(data); err != nil {
				panic(err)
			}
		}
	}()

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		panic(err)
	}
	if err := cmd.Start(); err != nil {
		panic(err)
	}

	go func() {
		defer close(ch)
		buf := bufio.NewReader(stdout)
		for {
			line, err := buf.ReadString('\n')
			if err == io.EOF {
				break
			}
			if err != nil {
				panic(err)
			}

			n, err := strconv.Atoi(line[:len(line)-1])
			if err != nil {
				panic(err)
			}

			data := make([]byte, n)
			if _, err := io.ReadFull(buf, data); err != nil {
				panic(err)
			}
			if _, err := buf.ReadByte(); err != nil {
				panic(err)
			}

			ch <- data
		}
		if err := stdout.Close(); err != nil {
			panic(err)
		}
		if err := cmd.Wait(); err != nil {
			panic(err)
		}
	}()

	return ch
}

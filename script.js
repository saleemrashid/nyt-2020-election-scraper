const FAVORITE = "bidenj";
const CANDIDATES = {
    "bidenj": {
        name: "Joe Biden",
        color: "#00a6ef",
    },
    "trumpd": {
        name: "Donald Trump",
        color: "#e9141d",
    },
};

const main = document.getElementById("main");
const plots = [];

for (const [state, record] of Object.entries(data)) {
    const chartContainer = document.createElement("div");
    main.appendChild(chartContainer);

    plots.push(Plotly.newPlot(chartContainer, Object.entries(CANDIDATES).map(([candidate, candidateData]) => {
        const candidateRecord = record.candidates[candidate];
        return {
            name: candidateData.name,
            x: record.timestamps,
            y: candidateRecord.percentages,
            text: candidateRecord.text,
            marker: {
                size: candidateRecord.sizes,
                sizeref: 2 * candidateRecord.maxSize / (40 * 40),
                sizemin: 4,
                sizemode: "area",
            },
            line: {
                color: candidateData.color
            },
            mode: "lines+markers",
            type: "scatter",
            hovertemplate: "%{text}<br><b>Time:</b> %{x}",
            hoverinfo: "text+name",
            showlegend: false,
        };
    }), {
        title: `${state} - ${record.name}`,
        hovermode: "closest",
        xaxis: {
            type: "date",
        },
        yaxis: {
            tickformat: ".2%",
        },
    }, { responsive: true }));

    const needleContainer = document.createElement("div");
    main.appendChild(needleContainer);
}

Promise.all(plots).then((plots) => {
    const range = plots.map((plot) => {
        return plot.layout.xaxis.range.map((date) => Date.parse(date.replace(" ", "T")));
    }).reduce(([currentMin, currentMax], [xmin, xmax]) => {
        return [Math.min(currentMin, xmin), Math.max(currentMax, xmax)];
    }, [Infinity, -Infinity]);

    for (const plot of plots) {
        Plotly.relayout(plot, {
            "xaxis.range": range,
        });
    }
});

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

for (const [state, record] of Object.entries(data)) {
    const chartContainer = document.createElement("div");
    main.appendChild(chartContainer);

    Plotly.newPlot(chartContainer, Object.entries(CANDIDATES).map(([candidate, candidateData]) => {
        const candidateRecord = record.candidates[candidate];
        return {
            name: candidateData.name,
            x: record.timestamps,
            y: candidateRecord.percentages,
            text: candidateRecord.text,
            marker: {
                size: record.sizes,
                sizeref: 2 * record.maxSize / (40 * 40),
                sizemin: 4,
                sizemode: "area",
            },
            line: {
                color: candidateData.color
            },
            mode: "lines+markers",
            type: "scatter",
            hoverinfo: "text+name",
            showlegend: false,
        };
    }), {
        title: `${state} - ${record.name}`,
        hovermode: "x",
        yaxis: {
            tickformat: ".2%",
        },
    }, { responsive: true });

    const needleContainer = document.createElement("div");
    main.appendChild(needleContainer);
}

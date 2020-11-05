const main = document.getElementById("main");
var div;
div = document.createElement("div");
main.appendChild(div);
Plotly.newPlot(div, [
    {
        name: "Biden",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:47:51.946Z","2020-11-04T18:56:14.325Z","2020-11-04T19:44:32.496Z","2020-11-04T20:28:27.938Z","2020-11-04T23:14:43.498Z","2020-11-05T00:20:56.454Z","2020-11-05T00:44:49.776Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            1367211 / 2639559,
            1410977 / 2766463,
            1411086 / 2766673,
            1411086 / 2766739,
            1411235 / 2767524,
            1411235 / 2767524,
            1411235 / 2767524,
            1413891 / 2773138,
            1413891 / 2773138,
        ],
        type: "scatter",
        line: { color: "blue" },
    },
    {
        name: "Trump",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:47:51.946Z","2020-11-04T18:56:14.325Z","2020-11-04T19:44:32.496Z","2020-11-04T20:28:27.938Z","2020-11-04T23:14:43.498Z","2020-11-05T00:20:56.454Z","2020-11-05T00:44:49.776Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            1236546 / 2639559,
            1317468 / 2766463,
            1317568 / 2766673,
            1317568 / 2766739,
            1318219 / 2767524,
            1318219 / 2767524,
            1318219 / 2767524,
            1321074 / 2773138,
            1321074 / 2773138,
        ],
        type: "scatter",
        line: { color: "red" },
    },
], {
    title: "Arizona - AZ",
    yaxis: {
        tickformat: ".1%",
    },
});
div = document.createElement("div");
main.appendChild(div);
Plotly.newPlot(div, [
    {
        name: "Biden",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:15:56.618Z","2020-11-04T16:35:11.828Z","2020-11-04T16:37:07.239Z","2020-11-04T17:16:47.676Z","2020-11-04T17:41:18.74Z","2020-11-04T17:44:28.196Z","2020-11-04T17:57:21.547Z","2020-11-04T18:40:57.265Z","2020-11-04T19:13:03.482Z","2020-11-04T19:28:48.57Z","2020-11-04T19:33:35.022Z","2020-11-04T19:36:47.711Z","2020-11-04T19:44:32.496Z","2020-11-04T20:14:42.157Z","2020-11-04T20:37:49.641Z","2020-11-04T20:48:16.492Z","2020-11-04T20:53:17.62Z","2020-11-04T21:12:19.926Z","2020-11-04T21:29:17.571Z","2020-11-04T21:37:45.33Z","2020-11-04T21:45:13.182Z","2020-11-04T21:55:46.318Z","2020-11-04T22:12:35.528Z","2020-11-04T22:27:15.94Z","2020-11-04T22:44:27.984Z","2020-11-04T22:54:27.393Z","2020-11-04T23:01:02.939Z","2020-11-04T23:14:43.498Z","2020-11-05T00:16:49.306Z","2020-11-05T00:20:56.454Z","2020-11-05T00:44:49.776Z","2020-11-05T00:55:32.963Z","2020-11-05T01:00:02.101Z","2020-11-05T01:16:26.657Z","2020-11-05T01:30:36.514Z","2020-11-05T01:37:29.545Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2280541 / 4723235,
            2280607 / 4723313,
            2280897 / 4723815,
            2283418 / 4727105,
            2300063 / 4746349,
            2300178 / 4746596,
            2301495 / 4749034,
            2303428 / 4751410,
            2306880 / 4755541,
            2307070 / 4756040,
            2307229 / 4756331,
            2307267 / 4756411,
            2307540 / 4757222,
            2312362 / 4763146,
            2315308 / 4768051,
            2315309 / 4768052,
            2315323 / 4768063,
            2320496 / 4778047,
            2320653 / 4778390,
            2321209 / 4779081,
            2321467 / 4779656,
            2334681 / 4796608,
            2335304 / 4798246,
            2335956 / 4799612,
            2335958 / 4799616,
            2336866 / 4800744,
            2352232 / 4824774,
            2357457 / 4832098,
            2357774 / 4832616,
            2358825 / 4834226,
            2371876 / 4850916,
            2374752 / 4857496,
            2376983 / 4860292,
            2377418 / 4861044,
            2377527 / 4861305,
            2387630 / 4875816,
            2387638 / 4875826,
            2387638 / 4875826,
        ],
        type: "scatter",
        line: { color: "blue" },
    },
    {
        name: "Trump",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:15:56.618Z","2020-11-04T16:35:11.828Z","2020-11-04T16:37:07.239Z","2020-11-04T17:16:47.676Z","2020-11-04T17:41:18.74Z","2020-11-04T17:44:28.196Z","2020-11-04T17:57:21.547Z","2020-11-04T18:40:57.265Z","2020-11-04T19:13:03.482Z","2020-11-04T19:28:48.57Z","2020-11-04T19:33:35.022Z","2020-11-04T19:36:47.711Z","2020-11-04T19:44:32.496Z","2020-11-04T20:14:42.157Z","2020-11-04T20:37:49.641Z","2020-11-04T20:48:16.492Z","2020-11-04T20:53:17.62Z","2020-11-04T21:12:19.926Z","2020-11-04T21:29:17.571Z","2020-11-04T21:37:45.33Z","2020-11-04T21:45:13.182Z","2020-11-04T21:55:46.318Z","2020-11-04T22:12:35.528Z","2020-11-04T22:27:15.94Z","2020-11-04T22:44:27.984Z","2020-11-04T22:54:27.393Z","2020-11-04T23:01:02.939Z","2020-11-04T23:14:43.498Z","2020-11-05T00:16:49.306Z","2020-11-05T00:20:56.454Z","2020-11-05T00:44:49.776Z","2020-11-05T00:55:32.963Z","2020-11-05T01:00:02.101Z","2020-11-05T01:16:26.657Z","2020-11-05T01:30:36.514Z","2020-11-05T01:37:29.545Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2384301 / 4723235,
            2384312 / 4723313,
            2384517 / 4723815,
            2385255 / 4727105,
            2387671 / 4746349,
            2387795 / 4746596,
            2388871 / 4749034,
            2389263 / 4751410,
            2389867 / 4755541,
            2390172 / 4756040,
            2390304 / 4756331,
            2390343 / 4756411,
            2390871 / 4757222,
            2391871 / 4763146,
            2393732 / 4768051,
            2393732 / 4768052,
            2393752 / 4768063,
            2398463 / 4778047,
            2398641 / 4778390,
            2398755 / 4779081,
            2399103 / 4779656,
            2402629 / 4796608,
            2403619 / 4798246,
            2404319 / 4799612,
            2404321 / 4799616,
            2404510 / 4800744,
            2412830 / 4824774,
            2414854 / 4832098,
            2415040 / 4832616,
            2415564 / 4834226,
            2418987 / 4850916,
            2422579 / 4857496,
            2423071 / 4860292,
            2423359 / 4861044,
            2423518 / 4861305,
            2427447 / 4875816,
            2427449 / 4875826,
            2427449 / 4875826,
        ],
        type: "scatter",
        line: { color: "red" },
    },
], {
    title: "Georgia - GA",
    yaxis: {
        tickformat: ".1%",
    },
});
div = document.createElement("div");
main.appendChild(div);
Plotly.newPlot(div, [
    {
        name: "Biden",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T21:41:50.861Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2655383 / 5457368,
            2655383 / 5457588,
            2655383 / 5457588,
        ],
        type: "scatter",
        line: { color: "blue" },
    },
    {
        name: "Trump",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T21:41:50.861Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2732120 / 5457368,
            2732120 / 5457588,
            2732120 / 5457588,
        ],
        type: "scatter",
        line: { color: "red" },
    },
], {
    title: "North Carolina - NC",
    yaxis: {
        tickformat: ".1%",
    },
});
div = document.createElement("div");
main.appendChild(div);
Plotly.newPlot(div, [
    {
        name: "Biden",
        x: ["2020-11-04T13:28:22.084Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            588252 / 1192915,
            588252 / 1192915,
        ],
        type: "scatter",
        line: { color: "blue" },
    },
    {
        name: "Trump",
        x: ["2020-11-04T13:28:22.084Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            580605 / 1192915,
            580605 / 1192915,
        ],
        type: "scatter",
        line: { color: "red" },
    },
], {
    title: "Nevada - NV",
    yaxis: {
        tickformat: ".1%",
    },
});
div = document.createElement("div");
main.appendChild(div);
Plotly.newPlot(div, [
    {
        name: "Biden",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:23:44.006Z","2020-11-04T14:32:18.76Z","2020-11-04T14:56:08.718Z","2020-11-04T15:17:08.834Z","2020-11-04T15:25:43.02Z","2020-11-04T15:41:34.72Z","2020-11-04T15:52:05.608Z","2020-11-04T16:01:30.816Z","2020-11-04T16:03:50.679Z","2020-11-04T16:12:53.458Z","2020-11-04T16:25:01.96Z","2020-11-04T16:32:53.805Z","2020-11-04T16:41:26.635Z","2020-11-04T16:45:02.187Z","2020-11-04T16:52:58.575Z","2020-11-04T17:04:21.985Z","2020-11-04T17:16:47.676Z","2020-11-04T17:24:40.785Z","2020-11-04T17:41:18.74Z","2020-11-04T17:44:28.196Z","2020-11-04T18:15:15.698Z","2020-11-04T18:23:27.249Z","2020-11-04T18:40:57.265Z","2020-11-04T18:56:14.325Z","2020-11-04T19:13:03.482Z","2020-11-04T19:17:39.759Z","2020-11-04T19:33:35.022Z","2020-11-04T19:44:32.496Z","2020-11-04T19:47:46.988Z","2020-11-04T20:03:16.371Z","2020-11-04T20:06:10.353Z","2020-11-04T20:10:29.212Z","2020-11-04T20:14:42.157Z","2020-11-04T20:23:38.149Z","2020-11-04T20:37:49.641Z","2020-11-04T20:48:16.492Z","2020-11-04T20:53:17.62Z","2020-11-04T20:58:39.936Z","2020-11-04T21:04:05.68Z","2020-11-04T21:21:34.232Z","2020-11-04T21:29:17.571Z","2020-11-04T21:41:50.861Z","2020-11-04T21:45:43.15Z","2020-11-04T22:04:57.073Z","2020-11-04T22:12:35.528Z","2020-11-04T22:19:33.085Z","2020-11-04T22:21:41.452Z","2020-11-04T22:38:48.872Z","2020-11-04T22:44:27.984Z","2020-11-04T22:54:27.393Z","2020-11-04T23:01:02.939Z","2020-11-04T23:14:43.498Z","2020-11-04T23:16:40.259Z","2020-11-04T23:24:27.309Z","2020-11-04T23:28:04.977Z","2020-11-04T23:41:34.119Z","2020-11-04T23:49:45.306Z","2020-11-05T00:16:49.306Z","2020-11-05T00:44:49.776Z","2020-11-05T00:55:32.963Z","2020-11-05T01:02:56.314Z","2020-11-05T01:07:02.27Z","2020-11-05T01:21:51.237Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2350664 / 5392682,
            2354317 / 5397262,
            2387300 / 5436823,
            2387351 / 5436911,
            2390331 / 5441186,
            2431315 / 5485791,
            2475795 / 5568345,
            2477804 / 5571106,
            2480467 / 5575573,
            2480744 / 5576129,
            2491390 / 5591159,
            2518767 / 5625057,
            2522086 / 5631378,
            2536072 / 5651860,
            2545561 / 5665209,
            2545576 / 5665239,
            2556520 / 5680456,
            2584147 / 5716136,
            2584255 / 5716355,
            2584347 / 5716510,
            2591439 / 5727364,
            2595192 / 5732144,
            2598957 / 5736898,
            2599924 / 5738598,
            2600234 / 5739092,
            2603320 / 5743489,
            2609994 / 5754044,
            2610017 / 5754178,
            2620507 / 5768295,
            2625837 / 5775174,
            2644382 / 5798860,
            2644494 / 5799057,
            2664102 / 5827555,
            2693097 / 5859044,
            2705983 / 5875258,
            2718242 / 5890798,
            2741519 / 5915452,
            2745557 / 5920979,
            2751960 / 5929739,
            2761196 / 5942166,
            2775716 / 5965561,
            2798232 / 5993159,
            2798695 / 5994046,
            2800627 / 5997324,
            2817059 / 6019273,
            2817309 / 6021329,
            2824632 / 6028585,
            2824632 / 6030891,
            2830772 / 6041418,
            2843335 / 6057779,
            2844391 / 6059144,
            2866042 / 6086774,
            2878819 / 6104416,
            2882177 / 6108995,
            2883207 / 6111185,
            2885334 / 6114382,
            2886699 / 6117742,
            2902352 / 6138839,
            2917019 / 6158220,
            2972001 / 6236205,
            2988490 / 6260716,
            2988637 / 6260933,
            2993072 / 6266545,
            3000512 / 6277135,
            3000512 / 6277135,
        ],
        type: "scatter",
        line: { color: "blue" },
    },
    {
        name: "Trump",
        x: ["2020-11-04T13:28:22.084Z","2020-11-04T14:23:44.006Z","2020-11-04T14:32:18.76Z","2020-11-04T14:56:08.718Z","2020-11-04T15:17:08.834Z","2020-11-04T15:25:43.02Z","2020-11-04T15:41:34.72Z","2020-11-04T15:52:05.608Z","2020-11-04T16:01:30.816Z","2020-11-04T16:03:50.679Z","2020-11-04T16:12:53.458Z","2020-11-04T16:25:01.96Z","2020-11-04T16:32:53.805Z","2020-11-04T16:41:26.635Z","2020-11-04T16:45:02.187Z","2020-11-04T16:52:58.575Z","2020-11-04T17:04:21.985Z","2020-11-04T17:16:47.676Z","2020-11-04T17:24:40.785Z","2020-11-04T17:41:18.74Z","2020-11-04T17:44:28.196Z","2020-11-04T18:15:15.698Z","2020-11-04T18:23:27.249Z","2020-11-04T18:40:57.265Z","2020-11-04T18:56:14.325Z","2020-11-04T19:13:03.482Z","2020-11-04T19:17:39.759Z","2020-11-04T19:33:35.022Z","2020-11-04T19:44:32.496Z","2020-11-04T19:47:46.988Z","2020-11-04T20:03:16.371Z","2020-11-04T20:06:10.353Z","2020-11-04T20:10:29.212Z","2020-11-04T20:14:42.157Z","2020-11-04T20:23:38.149Z","2020-11-04T20:37:49.641Z","2020-11-04T20:48:16.492Z","2020-11-04T20:53:17.62Z","2020-11-04T20:58:39.936Z","2020-11-04T21:04:05.68Z","2020-11-04T21:21:34.232Z","2020-11-04T21:29:17.571Z","2020-11-04T21:41:50.861Z","2020-11-04T21:45:43.15Z","2020-11-04T22:04:57.073Z","2020-11-04T22:12:35.528Z","2020-11-04T22:19:33.085Z","2020-11-04T22:21:41.452Z","2020-11-04T22:38:48.872Z","2020-11-04T22:44:27.984Z","2020-11-04T22:54:27.393Z","2020-11-04T23:01:02.939Z","2020-11-04T23:14:43.498Z","2020-11-04T23:16:40.259Z","2020-11-04T23:24:27.309Z","2020-11-04T23:28:04.977Z","2020-11-04T23:41:34.119Z","2020-11-04T23:49:45.306Z","2020-11-05T00:16:49.306Z","2020-11-05T00:44:49.776Z","2020-11-05T00:55:32.963Z","2020-11-05T01:02:56.314Z","2020-11-05T01:07:02.27Z","2020-11-05T01:21:51.237Z","2020-11-05T01:39:49.633543315Z"],
        y: [
            2969504 / 5392682,
            2970396 / 5397262,
            2976682 / 5436823,
            2976718 / 5436911,
            2977987 / 5441186,
            2981316 / 5485791,
            3018569 / 5568345,
            3019296 / 5571106,
            3021061 / 5575573,
            3021331 / 5576129,
            3025570 / 5591159,
            3031700 / 5625057,
            3034722 / 5631378,
            3040962 / 5651860,
            3044682 / 5665209,
            3044696 / 5665239,
            3048870 / 5680456,
            3056769 / 5716136,
            3056878 / 5716355,
            3056940 / 5716510,
            3060862 / 5727364,
            3061817 / 5732144,
            3062922 / 5736898,
            3063634 / 5738598,
            3063810 / 5739092,
            3065085 / 5743489,
            3068909 / 5754044,
            3069017 / 5754178,
            3072500 / 5768295,
            3073966 / 5775174,
            3079613 / 5798860,
            3079698 / 5799057,
            3088227 / 5827555,
            3091753 / 5859044,
            3094872 / 5875258,
            3097942 / 5890798,
            3097942 / 5915452,
            3099391 / 5920979,
            3101645 / 5929739,
            3104658 / 5942166,
            3113332 / 5965561,
            3118163 / 5993159,
            3118571 / 5994046,
            3120004 / 5997324,
            3125226 / 6019273,
            3125552 / 6021329,
            3127925 / 6028585,
            3127925 / 6030891,
            3132158 / 6041418,
            3135747 / 6057779,
            3136539 / 6059144,
            3143021 / 6086774,
            3147665 / 6104416,
            3148829 / 6108995,
            3149961 / 6111185,
            3151010 / 6114382,
            3152933 / 6117742,
            3158410 / 6138839,
            3162910 / 6158220,
            3184237 / 6236205,
            3192271 / 6260716,
            3192337 / 6260933,
            3193432 / 6266545,
            3196465 / 6277135,
            3196465 / 6277135,
        ],
        type: "scatter",
        line: { color: "red" },
    },
], {
    title: "Pennsylvania - PA",
    yaxis: {
        tickformat: ".1%",
    },
});

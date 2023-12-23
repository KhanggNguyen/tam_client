import { useEffect, useState } from "react";

import {
    Fa0,
    Fa1,
    Fa2,
    Fa3,
    Fa4,
    Fa5,
    Fa6,
    Fa7,
    Fa8,
    Fa9,
} from "react-icons/fa6";

// const TAM_DATA_ENDPOINT = "http://localhost:5000";
const TAM_DATA_ENDPOINT = "https://tam-api.onrender.com";
const TAM_API_ENDPOINT = "https://montpellier-tam-api.vercel.app/api/query?";

const icons = {
    0: <Fa0 style={{ color: "#FFFFFF" }} />,
    1: <Fa1 style={{ color: "#FFFFFF" }} />,
    2: <Fa2 style={{ color: "#FFFFFF" }} />,
    3: <Fa3 style={{ color: "#FFFFFF" }} />,
    4: <Fa4 style={{ color: "#FFFFFF" }} />,
    5: <Fa5 style={{ color: "#FFFFFF" }} />,
    6: <Fa6 style={{ color: "#FFFFFF" }} />,
    7: <Fa7 style={{ color: "#FFFFFF" }} />,
    8: <Fa8 style={{ color: "#FFFFFF" }} />,
    9: <Fa9 style={{ color: "#FFFFFF" }} />,
};

const groupBy = (items, key) =>
    items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
    );

export const useRouteName = ({ route_short_name }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAndFilter = async (filters) => {
            try {
                setIsLoading(true);
                const queries = Object.keys(filters).map((key) => {
                    return `${key}=${filters[key]}`;
                });
                let URL = TAM_DATA_ENDPOINT + "?" + queries.join("&");

                const res = await (await fetch(URL)).json();

                //group by direction
                const resTripHeadSign = groupBy(res, "trip_headsign");

                //group by stop
                Object.keys(resTripHeadSign).forEach((key) => {
                    resTripHeadSign[key] = groupBy(
                        resTripHeadSign[key],
                        "stop_name"
                    );
                });

                //
                Object.keys(resTripHeadSign).forEach((key) => {
                    resTripHeadSign[key] = Object.fromEntries(
                        Object.entries(resTripHeadSign[key]).sort(
                            ([, a], [, b]) => a[0].stop_id - b[0].stop_id
                        )
                    );
                });

                // sort by wait time
                Object.keys(resTripHeadSign).forEach((key) => {
                    Object.keys(resTripHeadSign[key]).forEach((stopKey) => {
                        resTripHeadSign[key][stopKey].sort(
                            (a, b) =>
                                parseInt(a.delay_sec) - parseInt(b.delay_sec)
                        );
                    });
                });

                setData(resTripHeadSign);
                setIsLoading(false);
                return resTripHeadSign;
            } catch (err) {
                console.error(err);
            }
        };

        fetchAndFilter({ route_short_name });
    }, [route_short_name]);

    return { data, isLoading };
};

export const useLines = () => {
    const [lines, setLines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLines = async () => {
            try {
                setIsLoading(true);
                let URL = `${TAM_DATA_ENDPOINT}/lines`;

                const res = (await (await fetch(URL)).json()).map((line) => {
                    if (!line || line === "undefined") {
                        return {};
                    } else if (line == 1) {
                        return {
                            name: "1",
                            icon: <Fa1 style={{ color: "#FFFFFF" }} />,
                            backgroundColor: "#0055a0",
                        };
                    } else if (line == 2) {
                        return {
                            name: "2",
                            icon: <Fa2 style={{ color: "#FFFFFF" }} />,
                            backgroundColor: "#ee7f01",
                        };
                    } else if (line == 3) {
                        return {
                            name: "3",
                            icon: <Fa3 style={{ color: "#000000" }} />,
                            backgroundColor: "#cdd300",
                        };
                    } else if (line == 4) {
                        return {
                            name: "4",
                            icon: <Fa4 style={{ color: "#FFFFFF" }} />,
                            backgroundColor: "#582d22",
                        };
                    } else {
                        return {
                            name: line,
                            icon: String(line)
                                .split("")
                                .map((number) => icons[parseInt(number)]),
                            backgroundColor: "#0055a0",
                        };
                    }
                });
                setLines(res);
                setIsLoading(false);
                return res;
            } catch (err) {
                console.error(err);
            }
        };

        fetchLines();
    }, []);

    return { lines, isLoading };
};

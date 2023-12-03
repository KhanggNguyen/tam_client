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

const TAM_DATA_ENDPOINT = "http://localhost:5000";
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

export const useRouteName = ({ route_short_name }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAndFilter = async (filters) => {
            try {
                const queries = Object.keys(filters).map((key) => {
                    return `${key}=${filters[key]}`;
                });
                let URL = TAM_DATA_ENDPOINT + "?" + queries.join("&");

                const res = await (await fetch(URL)).json();
                const resTripHeadSign = Object.groupBy(
                    res,
                    ({ trip_headsign, stop_id, route_short_name }, index) => {
                        if (route_short_name === "4") {
                            if (index % 2 === 0) {
                                return `${trip_headsign} A`;
                            } else {
                                return `${trip_headsign} B`;
                            }
                        } else {
                            return trip_headsign;
                        }
                    }
                );

                Object.keys(resTripHeadSign).forEach((key) => {
                    resTripHeadSign[key] = Object.groupBy(
                        resTripHeadSign[key],
                        ({ stop_name }) => stop_name
                    );
                });

                Object.keys(resTripHeadSign).forEach((key) => {
                    resTripHeadSign[key] = Object.fromEntries(
                        Object.entries(resTripHeadSign[key]).sort(
                            ([, a], [, b]) => a[0].stop_id - b[0].stop_id
                        )
                    );
                });

                setData(resTripHeadSign);
                return resTripHeadSign;
            } catch (err) {
                console.error(err);
            }
        };

        fetchAndFilter({ route_short_name });
    }, [route_short_name]);

    return { data };
};

export const useLines = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const fetchLines = async () => {
            try {
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
                return res;
            } catch (err) {
                console.error(err);
            }
        };

        fetchLines();
    }, []);

    return { lines };
};

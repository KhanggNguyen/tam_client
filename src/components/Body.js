import { useSearchParams } from "react-router-dom";

import { useRouteName } from "../hooks";
import { useEffect, useState } from "react";
export const Body = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredData, setFilteredData] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const { data } = useRouteName({
        route_short_name: searchParams.get("route_short_name") || 1,
    });

    const handleSearch = (e) => {
        if (e.target.value.length == 0) setFilteredData(data);
        else {
            let tempData = {};
            Object.keys(data).forEach((trip_headsignKey) => {
                tempData[trip_headsignKey] = {};
                let filteredStops = Object.keys(data[trip_headsignKey]).filter(
                    (stopKey) => stopKey.includes(e.target.value.toUpperCase())
                );
                console.log(filteredStops);

                Object.keys(data[trip_headsignKey]).forEach((stopKey) => {
                    if (filteredStops.includes(stopKey)) {
                        tempData[trip_headsignKey][stopKey] =
                            data[trip_headsignKey][stopKey];
                    }
                });
            });
            setFilteredData(tempData);
        }
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <div className="line" data-testid="line">
            <h2 data-testid="project-name">
                {`Ligne ${searchParams.get("route_short_name") || 1}`}
            </h2>
            <input
                type="search"
                name="search"
                onChange={handleSearch}
                placeholder="Saisir une station"
            />
            <div className="line__trip_headingsign">
                {Object.keys(filteredData).map((trip_headsignKey) => (
                    <div
                        key={trip_headsignKey}
                        className="line__trip_headingsign__container"
                    >
                        <h3>Vers {trip_headsignKey}</h3>
                        <ul className="line__trip_headingsign__container__stops">
                            {Object.keys(filteredData[trip_headsignKey]).map(
                                (stopKey) => (
                                    <li key={trip_headsignKey + stopKey}>
                                        <div>{stopKey}</div>
                                        <div>
                                            {filteredData[trip_headsignKey][
                                                stopKey
                                            ].map((stop) => {
                                                return (
                                                    <span
                                                        key={
                                                            trip_headsignKey +
                                                            stop.course
                                                        }
                                                    >
                                                        {`${Math.ceil(
                                                            stop.delay_sec / 60
                                                        )} min`}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

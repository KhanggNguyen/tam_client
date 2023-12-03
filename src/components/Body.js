import { useSearchParams } from "react-router-dom";

import { useRouteName } from "../hooks";
import { useState } from "react";
export const Body = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('')
    const { data } = useRouteName({
        route_short_name: searchParams.get("route_short_name") || 1,
    });

    console.log(data)

    return (
        <div className="line" data-testid="line">
            <h2 data-testid="project-name">
                {`Ligne ${searchParams.get("route_short_name") || 1}`}
            </h2>
            <div className="line__trip_headingsign">
                {Object.keys(data).map((trip_headsignKey) => (
                    <div
                        key={trip_headsignKey}
                        className="line__trip_headingsign__container"
                    >
                        <h3>Vers {trip_headsignKey}</h3>
                        <ul className="line__trip_headingsign__container__stops">
                            {Object.keys(data[trip_headsignKey]).map(
                                (stopKey) => (
                                    <li key={trip_headsignKey + stopKey}>
                                        <div>{stopKey}</div>
                                        <div>
                                            {data[trip_headsignKey][
                                                stopKey
                                            ].map((stop) => {
                                                return (
                                                    <span key={trip_headsignKey+stop.course}>
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

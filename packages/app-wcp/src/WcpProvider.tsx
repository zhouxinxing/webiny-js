import React, { useState } from "react";
import { WcpProviderComponent } from "./contexts";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GetWcpProjectGqlResponse, WcpProject } from "~/types";

export const GET_WCP_PROJECT = gql`
    query GetWcpProject {
        wcp {
            getProject {
                data {
                    package {
                        features {
                            seats {
                                enabled
                                options
                            }
                            multiTenancy {
                                enabled
                            }
                            advancedPublishingWorkflow {
                                enabled
                            }
                        }
                    }
                }
                error {
                    message
                    code
                    data
                }
            }
        }
    }
`;

export const WcpProvider: React.FC = ({ children }) => {
    const [project, setProject] = useState<WcpProject | null | undefined>(undefined);
    useQuery<GetWcpProjectGqlResponse>(GET_WCP_PROJECT, {
        skip: !!project,
        onCompleted: response => {
            setProject(response.wcp.getProject.data);
        }
    });

    if (project === undefined) {
        return null;
    }

    return <WcpProviderComponent project={project}>{children}</WcpProviderComponent>;
};
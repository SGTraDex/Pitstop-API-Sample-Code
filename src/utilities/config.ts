export interface IConfig {
    identity: {
        id: string,
        name: string,
        channel_url: string,
        bucket_name: string,
        public_key: string,
        organization: {
            id: string,
            name: string,
            org_type: string,
            icon_url: string
        },
        source_system_config: {
            url: string,
            middlewares: {}
        }
    },
    produces: [
        {
            id: string,
            name: string,
            schema: {},
            querySchema: {},
            to: [
                {
                    id: string,
                    name: string,
                    icon_url: string,
                    on_behalf_of: [
                        {
                            id: string,
                            name: string,
                            lookupid: string,
                            icon_url: string
                        }
                    ],
                    system: {
                        id: string,
                        name: string
                    }
                }
            ]
        }
    ],
    consumes: [
        {
            id: string,
            name: string,
            schema: {},
            querySchema: {},
            to: [
                {
                    id: string,
                    name: string,
                    icon_url: string,
                    on_behalf_of: [
                        {
                            id: string,
                            name: string,
                            lookupid: string,
                            icon_url: string
                        }
                    ],
                    system: {
                        id: string,
                        name: string
                    }
                }
            ]
        }
    ]
}
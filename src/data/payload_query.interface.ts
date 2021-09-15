export type NotifyMessage = "CONFIG_REFRESH" | "PUSH_SUCCESS" | "PUSH_FAILED" | "PULL_FAILED";
export type NotifyMessageType = "PITSTOP" | "SOURCE";

export interface INotifyRequest {
    timestamp: string,
    notify_message: NotifyMessage,
    notify_message_stage: NotifyMessageType
}

export interface IBillofLading {
    bl_doc_no?: string, //Document Number of Bill of Lading
    bl_order_no?: string, //Order Number of Bill of Lading
    bl_vessel_nm: string, //Name of Vessel
    bl_vessel_flag?: string, //Flag of Vessel
    bl_vessel_imo_no?: string, //IMO Number of Vessel
    bl_dt: string, //Date when cargo is loaded on board the vessel or BL Date
    bl_goods_particulars: IBillGoodsParticulars[],
    bl_shipper_nm?: string, //Name of Shipper
    bl_notify_party_nm?: string, //Name of Notify Party
    bl_port_of_loading: string, //Port which goods were loaded
    bl_port_of_discharge: string, //Port which goods will be discharged
    bl_consignee_nm?: string, //Name of Consignee
    attachments: IBillAttachments[]
}

export interface IBillGoodsParticulars {
    bl_goods_nm: string, //Name of goods on vessel
    bl_goods_qty_amt: number, //Quantity of goods
    bl_goods_qty_uom: string //UOM of goodsa
}

export interface IBillAttachments {
    filename: string, //file name with extension. ex:invoice_123.pdf
    file_content: string //base64 encoded content
}

export interface IBillofLadingQuery {
    bl_doc_no: string
    bl_order_no?: string
}

export interface IPushData {
    participants: [
        {
            "id": string,
            "name"?: string
        }
    ],
    payload: IBillofLading[],
    on_behalf_of?: [
        {
            "id": string
        }
    ],
    dataElementId: string
}

export interface IPullData {
    participants: [
        {
            "id": string,
            "name"?: string
        }
    ],
    parameters: IBillofLadingQuery,
    on_behalf_of?: [
        {
            "id": string
        }
    ],
    dataElementId: string
}
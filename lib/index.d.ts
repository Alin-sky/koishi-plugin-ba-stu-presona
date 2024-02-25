import { Context, Schema } from 'koishi';
export declare const inject: {
    required: string[];
};
export declare const using: string[];
export declare const name = "ba-stu-presona";
export interface Config {
}
export declare const Config: Schema<Config>;
declare module 'koishi' {
    interface Tables {
        presona: presona;
    }
}
export interface presona {
    id: string;
    imgid: string;
    age: number;
    color: string;
    cup: string;
    tactics_type: string;
    weaponry: string;
    target_precautionary_type: string;
    target_precautionary_type_2nd: string;
    school: string;
    yewai: string;
    jiedao: string;
    shinei: string;
    one: string;
    two: string;
    three: string;
}
export declare function apply(ctx: Context): Promise<void>;

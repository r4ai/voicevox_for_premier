/* tslint:disable */
/* eslint-disable */
/**
 * VOICEVOX Engine
 * VOICEVOXの音声合成エンジンです。
 *
 * The version of the OpenAPI document: 0.14.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MorphableTargetInfo
 */
export interface MorphableTargetInfo {
    /**
     * 
     * @type {boolean}
     * @memberof MorphableTargetInfo
     */
    isMorphable: boolean;
}

/**
 * Check if a given object implements the MorphableTargetInfo interface.
 */
export function instanceOfMorphableTargetInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "isMorphable" in value;

    return isInstance;
}

export function MorphableTargetInfoFromJSON(json: any): MorphableTargetInfo {
    return MorphableTargetInfoFromJSONTyped(json, false);
}

export function MorphableTargetInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MorphableTargetInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isMorphable': json['is_morphable'],
    };
}

export function MorphableTargetInfoToJSON(value?: MorphableTargetInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'is_morphable': value.isMorphable,
    };
}


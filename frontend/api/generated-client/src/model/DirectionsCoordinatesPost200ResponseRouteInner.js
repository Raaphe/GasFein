/**
 * GasFein API
 * This is the official API of GasFein
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DirectionsCoordinatesPost200ResponseRouteInner model module.
 * @module model/DirectionsCoordinatesPost200ResponseRouteInner
 * @version 1.0.0
 */
class DirectionsCoordinatesPost200ResponseRouteInner {
    /**
     * Constructs a new <code>DirectionsCoordinatesPost200ResponseRouteInner</code>.
     * @alias module:model/DirectionsCoordinatesPost200ResponseRouteInner
     */
    constructor() { 
        
        DirectionsCoordinatesPost200ResponseRouteInner.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DirectionsCoordinatesPost200ResponseRouteInner</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DirectionsCoordinatesPost200ResponseRouteInner} obj Optional instance to populate.
     * @return {module:model/DirectionsCoordinatesPost200ResponseRouteInner} The populated <code>DirectionsCoordinatesPost200ResponseRouteInner</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DirectionsCoordinatesPost200ResponseRouteInner();

            if (data.hasOwnProperty('longitude')) {
                obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
            }
            if (data.hasOwnProperty('latitude')) {
                obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DirectionsCoordinatesPost200ResponseRouteInner</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DirectionsCoordinatesPost200ResponseRouteInner</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Number} longitude
 */
DirectionsCoordinatesPost200ResponseRouteInner.prototype['longitude'] = undefined;

/**
 * @member {Number} latitude
 */
DirectionsCoordinatesPost200ResponseRouteInner.prototype['latitude'] = undefined;






export default DirectionsCoordinatesPost200ResponseRouteInner;


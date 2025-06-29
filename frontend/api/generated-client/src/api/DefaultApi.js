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


import ApiClient from "../ApiClient";
import DirectionsCoordinatesPost200Response from '../model/DirectionsCoordinatesPost200Response';
import DirectionsCoordinatesPost400Response from '../model/DirectionsCoordinatesPost400Response';
import DirectionsCoordinatesPost500Response from '../model/DirectionsCoordinatesPost500Response';
import DirectionsCoordinatesPostRequestInner from '../model/DirectionsCoordinatesPostRequestInner';

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.0
*/
export default class DefaultApi {

    /**
    * Constructs a new DefaultApi. 
    * @alias module:api/DefaultApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the directionsCoordinatesPost operation.
     * @callback module:api/DefaultApi~directionsCoordinatesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DirectionsCoordinatesPost200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get directions with multiple points
     * Accepts an array of objects containing either coordinates (longitude and latitude) or an address.
     * @param {Array.<module:model/DirectionsCoordinatesPostRequestInner>} directionsCoordinatesPostRequestInner 
     * @param {module:api/DefaultApi~directionsCoordinatesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DirectionsCoordinatesPost200Response}
     */
    directionsCoordinatesPost(directionsCoordinatesPostRequestInner, callback) {
      let postBody = directionsCoordinatesPostRequestInner;
      // verify the required parameter 'directionsCoordinatesPostRequestInner' is set
      if (directionsCoordinatesPostRequestInner === undefined || directionsCoordinatesPostRequestInner === null) {
        throw new Error("Missing the required parameter 'directionsCoordinatesPostRequestInner' when calling directionsCoordinatesPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['BearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = DirectionsCoordinatesPost200Response;
      return this.apiClient.callApi(
        '/directions/coordinates', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}

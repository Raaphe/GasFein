# GasFeinApi.DefaultApi

All URIs are relative to *http://10.0.0.37:3005/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**directionsCoordinatesPost**](DefaultApi.md#directionsCoordinatesPost) | **POST** /directions/coordinates | Get directions with multiple points



## directionsCoordinatesPost

> DirectionsCoordinatesPost200Response directionsCoordinatesPost(directionsCoordinatesPostRequestInner)

Get directions with multiple points

Accepts an array of objects containing either coordinates (longitude and latitude) or an address.

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.DefaultApi();
let directionsCoordinatesPostRequestInner = [new GasFeinApi.DirectionsCoordinatesPostRequestInner()]; // [DirectionsCoordinatesPostRequestInner] | 
apiInstance.directionsCoordinatesPost(directionsCoordinatesPostRequestInner, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **directionsCoordinatesPostRequestInner** | [**[DirectionsCoordinatesPostRequestInner]**](DirectionsCoordinatesPostRequestInner.md)|  | 

### Return type

[**DirectionsCoordinatesPost200Response**](DirectionsCoordinatesPost200Response.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


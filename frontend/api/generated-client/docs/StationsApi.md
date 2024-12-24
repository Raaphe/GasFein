# GasFeinApi.StationsApi

All URIs are relative to *http://172.20.10.3:3005/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersUserIdStationsGet**](StationsApi.md#usersUserIdStationsGet) | **GET** /users/{userId}/stations | Get all stations of a user
[**usersUserIdStationsPost**](StationsApi.md#usersUserIdStationsPost) | **POST** /users/{userId}/stations | Add a station to a user
[**usersUserIdStationsStationIdDelete**](StationsApi.md#usersUserIdStationsStationIdDelete) | **DELETE** /users/{userId}/stations/{stationId} | Remove a station from a user&#39;s list of stations



## usersUserIdStationsGet

> usersUserIdStationsGet(userId)

Get all stations of a user

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.StationsApi();
let userId = 56; // Number | The ID of the user to fetch stations for
apiInstance.usersUserIdStationsGet(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| The ID of the user to fetch stations for | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usersUserIdStationsPost

> usersUserIdStationsPost(userId, usersUserIdStationsPostRequest)

Add a station to a user

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.StationsApi();
let userId = 56; // Number | The ID of the user to add a station to
let usersUserIdStationsPostRequest = new GasFeinApi.UsersUserIdStationsPostRequest(); // UsersUserIdStationsPostRequest | 
apiInstance.usersUserIdStationsPost(userId, usersUserIdStationsPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| The ID of the user to add a station to | 
 **usersUserIdStationsPostRequest** | [**UsersUserIdStationsPostRequest**](UsersUserIdStationsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## usersUserIdStationsStationIdDelete

> usersUserIdStationsStationIdDelete(userId, stationId)

Remove a station from a user&#39;s list of stations

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.StationsApi();
let userId = 56; // Number | The ID of the user from whose station list the station will be removed
let stationId = "stationId_example"; // String | The ID of the station to be removed
apiInstance.usersUserIdStationsStationIdDelete(userId, stationId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**| The ID of the user from whose station list the station will be removed | 
 **stationId** | **String**| The ID of the station to be removed | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


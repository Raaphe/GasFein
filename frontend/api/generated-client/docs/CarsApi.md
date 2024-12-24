# GasFeinApi.CarsApi

All URIs are relative to *http://172.20.10.3:3005/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersUserIdCarsCarIdDelete**](CarsApi.md#usersUserIdCarsCarIdDelete) | **DELETE** /users/{userId}/cars/{carId} | Remove a car from a user&#39;s list of cars
[**usersUserIdCarsGet**](CarsApi.md#usersUserIdCarsGet) | **GET** /users/{userId}/cars | Get all cars of a user
[**usersUserIdCarsPost**](CarsApi.md#usersUserIdCarsPost) | **POST** /users/{userId}/cars | Add a car to a user



## usersUserIdCarsCarIdDelete

> usersUserIdCarsCarIdDelete(userId, carId)

Remove a car from a user&#39;s list of cars

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.CarsApi();
let userId = 56; // Number | The ID of the user whose car list the car will be removed from
let carId = "carId_example"; // String | The ID of the car to be removed
apiInstance.usersUserIdCarsCarIdDelete(userId, carId, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user whose car list the car will be removed from | 
 **carId** | **String**| The ID of the car to be removed | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usersUserIdCarsGet

> usersUserIdCarsGet(userId)

Get all cars of a user

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.CarsApi();
let userId = 56; // Number | The ID of the user to fetch cars for
apiInstance.usersUserIdCarsGet(userId, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user to fetch cars for | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## usersUserIdCarsPost

> usersUserIdCarsPost(userId, usersUserIdCarsPostRequest)

Add a car to a user

### Example

```javascript
import GasFeinApi from 'gas_fein_api';
let defaultClient = GasFeinApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new GasFeinApi.CarsApi();
let userId = 56; // Number | The ID of the user to add a car to
let usersUserIdCarsPostRequest = new GasFeinApi.UsersUserIdCarsPostRequest(); // UsersUserIdCarsPostRequest | 
apiInstance.usersUserIdCarsPost(userId, usersUserIdCarsPostRequest, (error, data, response) => {
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
 **userId** | **Number**| The ID of the user to add a car to | 
 **usersUserIdCarsPostRequest** | [**UsersUserIdCarsPostRequest**](UsersUserIdCarsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


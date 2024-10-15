package org.backend.app_exception_handler;

import org.backend.auth_server.auth_entities.ResponseDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request){
        Map<String,Object> errResponse = new HashMap<>();
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach((err)->{
            errors.add(err.getField()+" -> "+err.getDefaultMessage());
        });
        errResponse.put("errorList",errors);
        ResponseDto errorResponse = ResponseDto.builder()
                .http_status_code(400).resposneBody(errResponse).message("Input validation Failed").build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex){
        Map<String,Object> errResponse = new HashMap<>();
        List<String> errors = new ArrayList<>();
        errors.add(ex.getMessage());
        errResponse.put("errorList",errors);
        ResponseDto errorResponse = ResponseDto.builder()
                .http_status_code(401).resposneBody(errResponse).message("Authentication Failed").build();
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }



}

package org.backend.auth_server.auth_entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseDto {
    private int http_status_code;
    private Object resposneBody;
    private String message;
}

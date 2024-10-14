package org.backend.auth;

//import jakarta.ws.rs.POST;
import org.backend.auth_entities.LoginDto;
import org.backend.auth_entities.ResponseDto;
import org.backend.auth_entities.SignUpDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    //Auth Routes -> Sign up and Login
    @PostMapping(value = "/signup")
    public ResponseEntity<Object> registerUser(@RequestBody SignUpDetails userDetails){
        ResponseDto resposne = ResponseDto.builder().http_status_code(200).message("User has been successfully registered")
                .resposneBody(authService.signupUser(userDetails)).build();
        return new ResponseEntity<>(resposne , HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object>  loginUser(@RequestBody LoginDto loginDetails){
        ResponseDto resposne = ResponseDto.builder().http_status_code(200).message("User has been successfully logged in")
                .resposneBody(authService.loginUser(loginDetails)).build();
        return new ResponseEntity<>(resposne,HttpStatus.OK);
    }
}
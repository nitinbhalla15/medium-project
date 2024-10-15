package org.backend.auth_server.auth;

import lombok.extern.slf4j.Slf4j;
import org.backend.auth_server.auth_entities.LoginDto;
import org.backend.auth_server.auth_entities.SignUpDetails;
import org.backend.auth_server.auth_filter.JWTService;
import org.backend.auth_server.auth_repo.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private AuthRepository authRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public Map<String,Object> signupUser(SignUpDetails userDetail){
        log.info("Registering user");
        Map<String,Object> responseObject = new HashMap<>();
        SignUpDetails encodedUser =  SignUpDetails.builder()
                .email(userDetail.getUsername())
                .firstName(userDetail.getFirstName())
                .lastName(userDetail.getFirstName())
                .password(passwordEncoder.encode(userDetail.getPassword())).build();
        //saving the user Details in DB
        authRepo.save(encodedUser);
        String jwtToken = jwtService.generateToken(encodedUser.getEmail());
        responseObject.put("jwtToken",jwtToken);
        responseObject.put("userEmail",encodedUser.getEmail());
        return responseObject;
    }

    public Map<String,Object> loginUser(LoginDto loginDetails){
        log.info("Logging in user");
        Map<String,Object> responseObject = new HashMap<>();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDetails.getUsername(),loginDetails.getPassword()
        ));
        String jwtToken = jwtService.generateToken(loginDetails.getUsername());
        responseObject.put("jwtToken",jwtToken);
        responseObject.put("userEmail",loginDetails.getUsername());
        return responseObject;
    }
}

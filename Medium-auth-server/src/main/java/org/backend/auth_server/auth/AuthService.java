package org.backend.auth_server.auth;

import lombok.extern.slf4j.Slf4j;
import org.backend.app_exception_handler.UnidentifiedError;
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

    public Map<String,Object> signupUser(SignUpDetails userDetail) throws UnidentifiedError {
        try {
            log.info("Registering user");
            Map<String, Object> responseObject = new HashMap<>();
            SignUpDetails encodedUser = SignUpDetails.builder()
                    .email(userDetail.getUsername())
                    .firstName(userDetail.getFirstName())
                    .lastName(userDetail.getFirstName())
                    .password(passwordEncoder.encode(userDetail.getPassword())).build();
            //saving the user Details in DB
            authRepo.save(encodedUser);
            String jwtToken = jwtService.generateToken(encodedUser.getEmail());
            responseObject.put("jwtToken", jwtToken);
            responseObject.put("userEmail", encodedUser.getEmail());
            responseObject.put("userId",encodedUser.getUser_id());
            responseObject.put("userName",encodedUser.getFirstName());
            return responseObject;
        }catch (Exception e){
            log.error("Error while Signing in user");
            throw new UnidentifiedError("Server is having some issue , kindly try again after sometime");
        }
    }

    public Map<String,Object> loginUser(LoginDto loginDetails) {
            log.info("Logging in user");
            Map<String,Object> responseObject = new HashMap<>();
            //Can throw Authentication Exception -> Handled at Controller Advice with Custom Exception
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginDetails.getUsername(),loginDetails.getPassword()
            ));
            String jwtToken = jwtService.generateToken(loginDetails.getUsername());
            SignUpDetails userInfo = authRepo.findUserByEmailId(loginDetails.getUsername()).orElse(null);
            responseObject.put("jwtToken",jwtToken);
            responseObject.put("userEmail",loginDetails.getUsername());
            responseObject.put("userId",userInfo.getUser_id());
            responseObject.put("userName",userInfo.getFirstName());
            return responseObject;
    }

}

package org.backend.auth_repo;

import org.backend.auth_entities.SignUpDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<SignUpDetails, UUID> {

    @Query(nativeQuery = true,value = "Select * from sign_up_details where email = :emailId")
    Optional<SignUpDetails> findUserByEmailId(String emailId);

}

package com.chatapp.springrest.ChatApp.repo;

import java.util.List;
import java.util.Optional;

import com.chatapp.springrest.ChatApp.model.User;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByEmailAndPassword(String email, String password);

	// Optional<User> findByStatus(String status);
	@Query("SELECT u FROM User u WHERE NOT u.uniqueId = :uniqueId")
	List<User> findByUniqueId(Sort sort, @Param("uniqueId") String uniqueId);
}

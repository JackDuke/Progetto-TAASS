package com.chatapp.springrest.ChatApp.repo;

import java.util.List;

import com.chatapp.springrest.ChatApp.model.Message;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Long> {
	@Query("SELECT m FROM Message m LEFT JOIN FETCH User u ON u.uniqueId = m.idMittente " +
	"WHERE (m.idMittente = :uniqueId AND m.idDestinatario = :incomingId) OR (m.idMittente = :incomingId " + 
	"AND m.idDestinatario = :uniqueId)")
	List<Message> findByUniqueIdAndIncomingId(Sort sort, String uniqueId, String incomingId);

}
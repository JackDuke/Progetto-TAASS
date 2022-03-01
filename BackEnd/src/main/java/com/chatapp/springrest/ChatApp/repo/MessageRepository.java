package com.chatapp.springrest.ChatApp.repo;

import java.util.List;

import com.chatapp.springrest.ChatApp.model.Message;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Long> {
	/* @Query("SELECT m FROM Message LEFT JOIN User u ON u.uniqueId = m.idMittente WHERE " +
	"(outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id}) OR (outgoing_msg_id = {$incoming_id} " + 
	"AND incoming_msg_id = {$outgoing_id})") */
	// List<Message> findByUniqueIdAndIncomingId(Sort sort, String uniqueId, String incomingId);

}
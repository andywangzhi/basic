package com.zw.util;



import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class ReturnJsonUtil {

	public static <V, K> ResponseEntity<Map<K, V>> bindResultResponseEntity(
			Map<K, V> returnMap) {
		
		HttpHeaders headers = new HttpHeaders();
		
		
		headers.setContentType(MediaType.TEXT_PLAIN);
		
		
		return new ResponseEntity<Map<K, V>>(returnMap, headers, HttpStatus.OK);
	}
}

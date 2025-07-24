package com.erp.controller;

import com.erp.model.Collection;
import com.erp.repository.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "*")
public class CollectionController {
    
    @Autowired
    private CollectionRepository collectionRepository;
    
    // Get all collections
    @GetMapping
    public ResponseEntity<List<Collection>> getAllCollections() {
        try {
            List<Collection> collections = collectionRepository.findAll();
            return ResponseEntity.ok(collections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get collections by employee ID
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Collection>> getCollectionsByEmployee(@PathVariable String employeeId) {
        try {
            List<Collection> collections = collectionRepository.findByEmployeeIdOrderByStartDateDesc(employeeId);
            return ResponseEntity.ok(collections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get active collections
    @GetMapping("/active")
    public ResponseEntity<List<Collection>> getActiveCollections() {
        try {
            List<Collection> collections = collectionRepository.findByStatus(Collection.CollectionStatus.ACTIVE);
            return ResponseEntity.ok(collections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get overdue collections
    @GetMapping("/overdue")
    public ResponseEntity<List<Collection>> getOverdueCollections() {
        try {
            List<Collection> collections = collectionRepository.findOverdueCollections(LocalDate.now());
            return ResponseEntity.ok(collections);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get collections by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Collection>> getCollectionsByStatus(@PathVariable String status) {
        try {
            Collection.CollectionStatus collectionStatus = Collection.CollectionStatus.valueOf(status.toUpperCase());
            List<Collection> collections = collectionRepository.findByStatusOrderByDueDateAsc(collectionStatus);
            return ResponseEntity.ok(collections);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create new collection
    @PostMapping
    public ResponseEntity<Collection> createCollection(@RequestBody Collection collection) {
        try {
            collection.setStatus(Collection.CollectionStatus.ACTIVE);
            Collection savedCollection = collectionRepository.save(collection);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCollection);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update collection
    @PutMapping("/{id}")
    public ResponseEntity<Collection> updateCollection(@PathVariable Long id, @RequestBody Collection collectionDetails) {
        try {
            Optional<Collection> optionalCollection = collectionRepository.findById(id);
            if (optionalCollection.isPresent()) {
                Collection collection = optionalCollection.get();
                collection.setEmployeeId(collectionDetails.getEmployeeId());
                collection.setEmployeeName(collectionDetails.getEmployeeName());
                collection.setCollectionType(collectionDetails.getCollectionType());
                collection.setTotalAmount(collectionDetails.getTotalAmount());
                collection.setTotalInstallments(collectionDetails.getTotalInstallments());
                collection.setStartDate(collectionDetails.getStartDate());
                collection.setDueDate(collectionDetails.getDueDate());
                collection.setDescription(collectionDetails.getDescription());
                
                Collection updatedCollection = collectionRepository.save(collection);
                return ResponseEntity.ok(updatedCollection);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Record payment for collection
    @PutMapping("/{id}/payment")
    public ResponseEntity<Collection> recordPayment(@PathVariable Long id, @RequestParam BigDecimal amount) {
        try {
            Optional<Collection> optionalCollection = collectionRepository.findById(id);
            if (optionalCollection.isPresent()) {
                Collection collection = optionalCollection.get();
                collection.recordPayment(amount);
                
                Collection updatedCollection = collectionRepository.save(collection);
                return ResponseEntity.ok(updatedCollection);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Complete collection
    @PutMapping("/{id}/complete")
    public ResponseEntity<Collection> completeCollection(@PathVariable Long id) {
        try {
            Optional<Collection> optionalCollection = collectionRepository.findById(id);
            if (optionalCollection.isPresent()) {
                Collection collection = optionalCollection.get();
                collection.setStatus(Collection.CollectionStatus.COMPLETED);
                collection.setRemainingAmount(BigDecimal.ZERO);
                
                Collection updatedCollection = collectionRepository.save(collection);
                return ResponseEntity.ok(updatedCollection);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete collection
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long id) {
        try {
            if (collectionRepository.existsById(id)) {
                collectionRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get collections statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getCollectionsStatistics() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalCollections", collectionRepository.count());
            stats.put("activeCollections", collectionRepository.countByStatus(Collection.CollectionStatus.ACTIVE));
            stats.put("completedCollections", collectionRepository.countByStatus(Collection.CollectionStatus.COMPLETED));
            stats.put("overdueCollections", collectionRepository.countByStatus(Collection.CollectionStatus.OVERDUE));
            
            // Get total outstanding amount
            Double totalOutstanding = collectionRepository.getTotalOutstandingAmount();
            stats.put("totalOutstandingAmount", totalOutstanding);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get employee outstanding amount
    @GetMapping("/employee/{employeeId}/outstanding")
    public ResponseEntity<Double> getEmployeeOutstandingAmount(@PathVariable String employeeId) {
        try {
            Double outstanding = collectionRepository.getTotalOutstandingAmountByEmployee(employeeId);
            return ResponseEntity.ok(outstanding);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

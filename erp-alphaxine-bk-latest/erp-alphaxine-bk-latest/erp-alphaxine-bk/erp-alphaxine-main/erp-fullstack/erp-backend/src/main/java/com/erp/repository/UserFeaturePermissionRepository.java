package com.erp.repository;

import com.erp.model.UserFeaturePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserFeaturePermissionRepository extends JpaRepository<UserFeaturePermission, Long> {
    
    @Query("SELECT ufp FROM UserFeaturePermission ufp WHERE ufp.user.id = :userId AND ufp.isActive = true")
    List<UserFeaturePermission> findActivePermissionsByUserId(@Param("userId") Long userId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM UserFeaturePermission ufp WHERE ufp.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}

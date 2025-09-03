@@ .. @@
 import React, { useState } from 'react';
-import { Search, Menu, X, User, Bell, MessageSquare, Settings, LogOut, Shield } from 'lucide-react';
+import { Search, Menu, X, User, Bell, MessageSquare, Settings, LogOut, Shield, BellRing } from 'lucide-react';
 import { useAuth } from '../contexts/AuthContext';
+import { NotificationSettings } from './NotificationSettings';
 
 export const Header: React.FC = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
+  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
   const { user, logout } = useAuth();
 
@@ .. @@
             {user ? (
               <div className="flex items-center space-x-4">
                 {/* Notifications */}
-                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
-                  <Bell className="w-5 h-5" />
+                <button 
+                  onClick={() => setIsNotificationSettingsOpen(true)}
+                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative"
+                >
+                  <BellRing className="w-5 h-5" />
+                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                 </button>
 
@@ .. @@
         </div>
       </header>
+
+      {/* Notification Settings Modal */}
+      <NotificationSettings
+        isOpen={isNotificationSettingsOpen}
+        onClose={() => setIsNotificationSettingsOpen(false)}
+      />
     </>
   );
 };
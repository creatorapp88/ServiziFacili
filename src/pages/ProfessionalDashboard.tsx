@@ .. @@
 import React, { useState } from 'react';
 import { 
   BarChart3, Calendar, MessageSquare, Star, TrendingUp, 
-  MapPin, Euro, Clock, User, Phone, Mail, Award, Target
+  MapPin, Euro, Clock, User, Phone, Mail, Award, Target, Bell
 } from 'lucide-react';
+import { OpportunityNotifier } from '../components/OpportunityNotifier';
 
 export const ProfessionalDashboard: React.FC = () => {
@@ .. @@
           </div>
         </div>

+        {/* Notifiche Opportunità */}
+        <div className="bg-white rounded-lg shadow-sm p-6">
+          <OpportunityNotifier />
+        </div>
+
         {/* Recent Activity */}
         <div className="bg-white rounded-lg shadow-sm p-6">
@@ .. @@
   );
 };
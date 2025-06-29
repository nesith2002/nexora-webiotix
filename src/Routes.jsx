import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ServiceLandingHub from "pages/service-landing-hub";
import ClientProjectDashboard from "pages/client-project-dashboard";
import DemoWebsiteBuilderStudio from "pages/demo-website-builder-studio";
import EmployeeProjectManagementHub from "pages/employee-project-management-hub";
import AdminAnalyticsCommandCenter from "pages/admin-analytics-command-center";
import ClientServiceRequestCenter from "pages/client-service-request-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ServiceLandingHub />} />
        <Route path="/service-landing-hub" element={<ServiceLandingHub />} />
        <Route path="/client-project-dashboard" element={<ClientProjectDashboard />} />
        <Route path="/demo-website-builder-studio" element={<DemoWebsiteBuilderStudio />} />
        <Route path="/employee-project-management-hub" element={<EmployeeProjectManagementHub />} />
        <Route path="/admin-analytics-command-center" element={<AdminAnalyticsCommandCenter />} />
        <Route path="/client-service-request-center" element={<ClientServiceRequestCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
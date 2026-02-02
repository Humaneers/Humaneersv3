import os

# Map of old file names to new import paths (relative to src/)
MIGRATION_MAP = {
    # Home
    "HomeClient": "@/features/home/HomeClient",
    "Home": "@/features/home/Home",
    "SolutionSwitcher": "@/features/home/SolutionSwitcher",
    "ObjectionsSection": "@/features/home/ObjectionsSection",
    
    # Pricing
    "PricingClient": "@/features/pricing/PricingClient",
    "Pricing": "@/features/pricing/Pricing",
    "PricingComparisonTable": "@/features/pricing/PricingComparisonTable",
    
    # Support
    "Support": "@/features/support/Support",
    
    # Contact
    "ContactClient": "@/features/contact/ContactClient",
    "Contact": "@/features/contact/Contact",
    "TalkToSalesClient": "@/features/contact/TalkToSalesClient",
    "TalkToSales": "@/features/contact/TalkToSales",
    "TalkToSalesModal": "@/features/contact/TalkToSalesModal",
    "ContactModal": "@/features/contact/ContactModal",
    
    # About
    "AboutClient": "@/features/about/AboutClient",
    "About": "@/features/about/About",
    "ColophonClient": "@/features/about/ColophonClient",
    "Colophon": "@/features/about/Colophon",
    
    # Legal
    "TermsClient": "@/features/legal/TermsClient",
    "Terms": "@/features/legal/Terms",
    "PrivacyClient": "@/features/legal/PrivacyClient",
    "Privacy": "@/features/legal/Privacy",
    "EthicsClient": "@/features/legal/EthicsClient",
    "Ethics": "@/features/legal/Ethics",
    
    # Industries
    "IndustriesClient": "@/features/industries/IndustriesClient",
    "Industries": "@/features/industries/Industries",
    "NonProfitsClient": "@/features/industries/NonProfitsClient",
    "NonProfits": "@/features/industries/NonProfits",
    "SeniorCareClient": "@/features/industries/SeniorCareClient",
    "SeniorCare": "@/features/industries/SeniorCare",
    "EstateClient": "@/features/industries/EstateClient",
    "Estate": "@/features/industries/Estate",
    
    # Resources
    "ResourcesClient": "@/features/resources/ResourcesClient",
    "Resources": "@/features/resources/Resources",
    "StatusClient": "@/features/resources/StatusClient",
    "Status": "@/features/resources/Status",
    "Changelog": "@/features/resources/Changelog",
    
    # Shared
    "NotFound": "@/features/shared/NotFound",
    "ErrorBoundary": "@/features/shared/ErrorBoundary",
    "PageLoader": "@/features/shared/PageLoader",
    "ThankYouClient": "@/features/shared/ThankYouClient",
    
    # Services (Bulk)
    "ServicesClient": "@/features/services/ServicesClient",
    "Services": "@/features/services/Services",
    "ManagedITClient": "@/features/services/ManagedITClient",
    "ManagedIT": "@/features/services/ManagedIT",
    "CrisisManagementClient": "@/features/services/CrisisManagementClient",
    "CrisisManagement": "@/features/services/CrisisManagement",
    "FamilyProtectionClient": "@/features/services/FamilyProtectionClient",
    "FamilyProtection": "@/features/services/FamilyProtection",
    "FractionalLeadershipClient": "@/features/services/FractionalLeadershipClient",
    "FractionalLeadership": "@/features/services/FractionalLeadership",
    "VenturePortfolioClient": "@/features/services/VenturePortfolioClient",
    "PersonalClient": "@/features/services/PersonalClient",
    "Personal": "@/features/services/Personal",
    "ClientCareClient": "@/features/services/ClientCareClient",
    "ClientCare": "@/features/services/ClientCare",
    "GrowthClient": "@/features/services/GrowthClient",
    "Growth": "@/features/services/Growth",
}

def migrate_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        
        # Replace imports
        # Pattern: import { X } from "../components/views/X" OR import X from "../components/views/X"
        # We need to be careful. The easiest way is to replace the path part if it contains the component name.
        
        params_changed = False
        
        lines = content.split('\n')
        new_lines = []
        
        for line in lines:
            if 'import' in line and ('components/views' in line or 'components/PageLoader' in line or 'components/ErrorBoundary' in line):
                # Check if any key is in this line
                replaced = False
                for key, new_path in MIGRATION_MAP.items():
                    if key in line:
                        # Replace the path part
                        # e.g. import { HomeClient } from "../components/views/HomeClient"
                        # -> import { HomeClient } from "@/features/home/HomeClient"
                        
                        # Extract the path: anything between quotes
                        import_path_start = line.find('"') + 1
                        if import_path_start == 0:
                             import_path_start = line.find("'") + 1
                        
                        import_path_end = line.rfind('"')
                        if import_path_end == -1:
                            import_path_end = line.rfind("'")
                            
                        if import_path_start > 0 and import_path_end > import_path_start:
                            old_path = line[import_path_start:import_path_end]
                            # Only replace if it looks like an old path
                            if 'components/' in old_path:
                                new_line = line.replace(old_path, new_path)
                                new_lines.append(new_line)
                                replaced = True
                                params_changed = True
                                break
                
                if not replaced:
                    new_lines.append(line)
            else:
                new_lines.append(line)
                
        if params_changed:
            with open(filepath, 'w') as f:
                f.write('\n'.join(new_lines))
            print(f"Updated {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Walk through src/app
for root, dirs, files in os.walk("src/app"):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            migrate_file(os.path.join(root, file))

# Also update src/features files themselves (imports between features)
for root, dirs, files in os.walk("src/features"):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            migrate_file(os.path.join(root, file))

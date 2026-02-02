#!/bin/bash

# Home
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Home|@/features/home/Home|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/SolutionSwitcher|@/features/home/SolutionSwitcher|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/ObjectionsSection|@/features/home/ObjectionsSection|g'

# Pricing
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Pricing|@/features/pricing/Pricing|g'

# Support
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Support|@/features/support/Support|g'

# Contact
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Contact|@/features/contact/Contact|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/TalkToSales|@/features/contact/TalkToSales|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/ContactModal|@/features/contact/ContactModal|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/TalkToSalesModal|@/features/contact/TalkToSalesModal|g'

# About
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/About|@/features/about/About|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Colophon|@/features/about/Colophon|g'

# Legal
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Terms|@/features/legal/Terms|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Privacy|@/features/legal/Privacy|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Ethics|@/features/legal/Ethics|g'

# Industries
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Industries|@/features/industries/Industries|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/NonProfits|@/features/industries/NonProfits|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/SeniorCare|@/features/industries/SeniorCare|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Estate|@/features/industries/Estate|g'

# Resources
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Resources|@/features/resources/Resources|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Status|@/features/resources/Status|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Changelog|@/features/resources/Changelog|g'

# Shared
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/PageLoader|@/features/shared/PageLoader|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/ErrorBoundary|@/features/shared/ErrorBoundary|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/NotFound|@/features/shared/NotFound|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/ThankYouClient|@/features/shared/ThankYouClient|g'

# Services (Bulk)
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Services|@/features/services/Services|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/ManagedIT|@/features/services/ManagedIT|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/CrisisManagement|@/features/services/CrisisManagement|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/FamilyProtection|@/features/services/FamilyProtection|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/FractionalLeadership|@/features/services/FractionalLeadership|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/VenturePortfolioClient|@/features/services/VenturePortfolioClient|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Personal|@/features/services/Personal|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/ClientCare|@/features/services/ClientCare|g'
find src/app -name "*.tsx" | xargs sed -i '' 's|../components/views/Growth|@/features/services/Growth|g'

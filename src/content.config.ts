import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const toolsCollection = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/tools' }),
    schema: z.object({
        name: z.string(),
        slug: z.string(),
        category: z.enum(['EDR_XDR', 'SASE_VPN', 'IAM_PAM', 'BACKUP_DR', 'GRC_NIS2', 'VULN_PENTEST']),
        vendorCountry: z.string(),
        isEuropeanSovereign: z.boolean(),
        startingPriceMonthlyEur: z.number(),
        pricingModel: z.enum(['PER_USER', 'PER_ENDPOINT', 'FLAT_RATE', 'CUSTOM_QUOTE']),
        minimumSeats: z.number(),
        nis2ArticlesCovered: z.array(z.string()),
        certifications: z.array(z.string()),
        pros: z.array(z.string()).min(3),
        cons: z.array(z.string()).min(2),
        officialUrl: z.url(),
        affiliateUrl: z.string(),
        hasActiveAffiliateLink: z.boolean().default(false),
        pricingScreenshotPath: z.string(),
        lastVerifiedDate: z.string()
    })
});

const comparisonsCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
    schema: z.object({
        title: z.string().max(65),
        metaDescription: z.string().max(160),
        publishDate: z.string(),
        updatedDate: z.string(),
        category: z.string(),
        toolsCompared: z.array(z.string()),
        tldrVerdict: z.string(),
        nis2ComplianceFocus: z.string(),
        faq: z.array(z.object({
            question: z.string(),
            answer: z.string()
        })).min(3)
    })
});

export const collections = {
    tools: toolsCollection,
    comparisons: comparisonsCollection
};

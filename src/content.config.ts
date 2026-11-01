import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const status = z.enum([
  'implemented',
  'partial',
  'placeholder',
  'source-only',
  'design',
  'deployed-verified',
  'historical',
]);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    filterGroup: z.string(),
    order: z.number().int().positive().optional(),
    role: z.string(),
    period: z.string().optional(),
    summary: z.string(),
    status,
    repositoryIds: z.array(z.string()),
    evidenceIds: z.array(z.string()).min(1),
    storeUrl: z.url().optional(),
    coverImage: z.object({
      file: z.string().regex(/^projects\/[a-z0-9][a-z0-9_-]*\/[a-z0-9][a-z0-9._-]*\.(?:png|jpe?g|webp)$/i),
      alt: z.string().trim().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }).optional(),
    gallery: z.array(z.object({
      file: z.string().regex(/^projects\/[a-z0-9][a-z0-9_-]*\/[a-z0-9][a-z0-9._-]*\.(?:png|jpe?g|webp)$/i),
      alt: z.string().trim().min(1),
      caption: z.string().trim().min(1),
    })).default([]),
    featureProofs: z.array(z.object({
      id: z.string(),
      label: z.string(),
      state: status,
      evidenceIds: z.array(z.string()).min(1),
      limitation: z.string().optional(),
    })),
    stack: z.array(z.string()),
    availability: z.enum(['reachable', 'unreachable', 'unknown']).default('unknown'),
    limitations: z.array(z.string()).min(1),
    caseSlugs: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const experienceImagePath = z.string().regex(/^experiences\/[a-z0-9][a-z0-9_-]*\/[a-z0-9][a-z0-9._-]*\.(?:png|jpe?g|webp)$/i);
const experienceCompanyMedia = z.object({
  logo: z.object({
    file: experienceImagePath,
    alt: z.string().trim().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sourceUrl: z.url(),
  }),
  photos: z.array(z.object({
    file: experienceImagePath,
    alt: z.string().trim().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    caption: z.string().trim().min(1),
    sourceUrl: z.url(),
  })).default([]),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiences' }),
  schema: z.object({
    id: z.string(),
    organization: z.string(),
    role: z.string(),
    period: z.string(),
    order: z.number().int().positive(),
    displayOnExperiencePage: z.boolean(),
    detailPage: z.boolean().default(false),
    mapUrl: z.url().optional(),
    summary: z.string(),
    companyMedia: experienceCompanyMedia.optional(),
    technologies: z.array(z.string().trim().min(1)).default([]),
    evidenceIds: z.array(z.string()).min(1),
    projectSlugs: z.array(z.string()),
    attribution: z.enum(['user-attested', 'source-backed', 'mixed']),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    projectSlugs: z.array(z.string()),
    context: z.string(),
    constraints: z.array(z.string()).min(1),
    role: z.string(),
    roleAttribution: z.enum(['user-attested', 'source-backed', 'mixed']),
    approach: z.array(z.string()).min(1),
    decisions: z.array(z.object({
      decision: z.string(),
      rationale: z.string(),
      evidenceIds: z.array(z.string()),
      attribution: z.enum(['source-backed', 'user-attested', 'audit-scope']),
    })),
    verification: z.string(),
    result: z.string(),
    evidenceIds: z.array(z.string()).min(1),
    status,
    limitations: z.array(z.string()).min(1),
    relatedCaseSlugs: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/labs' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    evidenceIds: z.array(z.string()).min(1),
    state: z.enum(['learning', 'source-only', 'planned']),
    limitations: z.array(z.string()).min(1),
  }),
});

const capabilities = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/capabilities' }),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    projectSlugs: z.array(z.string()),
    evidenceIds: z.array(z.string()).min(1),
    state: status,
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    role: z.string(),
    headline: z.string(),
    supportingStatement: z.string(),
    availability: z.string(),
    summary: z.string(),
    responsibilityStatement: z.string().trim().min(1),
    aboutProjectSlugs: z.array(z.string().trim().min(1)).min(1),
    principles: z.array(z.object({
      number: z.string(),
      title: z.string(),
      description: z.string(),
    })),
    workflow: z.array(z.string()),
    focusAreas: z.array(z.string()),
    evidenceIds: z.array(z.string()).min(1),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    field: z.string(),
    cohort: z.string(),
    graduation: z.string(),
    evidenceIds: z.array(z.string()).min(1),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/contact' }),
  schema: z.object({
    email: z.email(),
    links: z.array(z.object({
      label: z.string(),
      url: z.url(),
    })),
    evidenceIds: z.array(z.string()).min(1),
  }),
});

export const collections = {
  projects,
  experiences,
  cases,
  labs,
  capabilities,
  profile,
  education,
  contact,
};

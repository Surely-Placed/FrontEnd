import React from 'react';
import { notFound } from 'next/navigation';
import CareerDetailsPage from '@/components/Careers/CareerDetailsPage';
import { careersOpenings, getCareerBySlug } from '../../../../../mockData/Careers';
import { buildPageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return careersOpenings.map((job) => ({
    slug: job.title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = getCareerBySlug(slug);

  if (!job) {
    return {
      title: 'Career Not Found | Surely Placed',
    };
  }

  return buildPageMetadata({
    title: `${job.title} | Careers at Surely Placed`,
    description: `Apply for the ${job.title} role at Surely Placed. Review responsibilities, requirements, AI expectations, and success metrics before submitting your application.`,
    path: `/careers/${slug}`,
  });
}

const page = async ({ params }) => {
  const { slug } = await params;
  const job = getCareerBySlug(slug);

  if (!job) notFound();

  return <CareerDetailsPage job={job} />;
};

export default page;

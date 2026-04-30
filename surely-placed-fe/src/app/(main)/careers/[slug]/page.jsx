import React from 'react';
import { notFound } from 'next/navigation';
import CareerDetailsPage from '@/components/Careers/CareerDetailsPage';
import { careersOpenings, getCareerBySlug } from '../../../../../mockData/Careers';

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

  return {
    title: `${job.title} | Careers at Surely Placed`,
    description: `${job.title} opening at Surely Placed. Explore role details, expectations, and apply now.`,
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  const job = getCareerBySlug(slug);

  if (!job) notFound();

  return <CareerDetailsPage job={job} />;
};

export default page;

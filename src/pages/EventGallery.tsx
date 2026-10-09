import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { getEvent } from '@/data/portfolioData';

export default function EventGallery() {
  const { eventId } = useParams();
  const event = getEvent(eventId);

  if (!event) {
    return (
      <Layout>
        <div className="page-padding py-24 text-center">
          <p className="text-xs text-muted-foreground mb-4">Work not found</p>
          <Link to="/archive" className="text-xs uppercase underline underline-offset-4">Back to archive</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{event.title} — coredeltav</title>
        <meta name="description" content={event.description} />
      </Helmet>
      <section className="page-padding pt-8 pb-16">
        <Link to="/archive" className="text-[10px] uppercase text-muted-foreground hover:text-foreground">← All work</Link>
        <div className="mt-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-4xl normal-case">{event.title}</h1>
            <p className="mt-2 text-[10px] uppercase text-muted-foreground">{event.category}</p>
          </div>
          <p className="max-w-md text-xs text-muted-foreground">{event.description}</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {event.photos.map((photo, i) => (
            <img key={i} src={photo.src} alt={photo.alt} loading={i < 3 ? 'eager' : 'lazy'}
              className="mb-4 w-full break-inside-avoid" />
          ))}
        </div>
      </section>
    </Layout>
  );
}

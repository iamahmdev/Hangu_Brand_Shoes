import { useEffect } from 'react';
import { Product } from '../../types';

interface SEOHeadProps {
  title: string;
  description?: string;
  product?: Product;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, product }) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Hangu Brand Shoes`;

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Product schema JSON-LD
    let scriptTag = document.getElementById('product-jsonld');
    if (product) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'product-jsonld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      const schemaData = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: product.brand
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'PKR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      };
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, product]);

  return null;
};

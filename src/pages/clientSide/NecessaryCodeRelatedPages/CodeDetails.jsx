import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Prism.js CSS for code styling

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const CodeDetails = () => {
  window.scrollTo(0, 0);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  // Fetch component data
  const { data: component = {} } = useQuery({
    queryKey: ['component'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/necessaryCode/${id}`);
      return res.data;
    }
  });

  // Highlight code on component mount
  useEffect(() => {
    Prism.highlightAll();
  }, [component?.componentCode]);

  // Copy code to clipboard
  const copyCodeToClipboard = () => {
    const code = component?.componentCode || '';
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Code Details</title>
      </Helmet>
      <p className="text-3xl bg-ashUi_primary font-bold text-center text-white py-5 mb-20">Necessary Codes</p>

      <div className="container mx-auto">
        {/* Component Name */}
        <p className="text-4xl my-5 font-bold text-ashUi_primary text-center">
          {component?.componentName}
        </p>



        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <img src={component?.imageUrl} alt="" className='w-full rounded-2xl shadow-lg border' />
          </div>
          <div className="border p-10 rounded-2xl">
            <p className="text-3xl font-bold">Description</p>
            <p className='my-5 text-xl'>
              {component?.componentDescription}
            </p>
          </div>
        </div>

        {/* Code Display Section */}
        <section className="code my-10">
          {/* Copy Code Button */}
          <div className="flex justify-end">
            <button
              onClick={copyCodeToClipboard}
              className="bg-ashUi_primary text-white px-4 py-2 rounded-md font-bold"
            >
              Copy Code
            </button>
          </div>

          {/* Display code for syntax highlighting */}
          <pre className='rounded-lg border'>
            <code className="language-js">
              {component?.componentCode}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default CodeDetails;

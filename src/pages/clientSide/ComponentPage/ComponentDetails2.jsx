import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { motion } from 'framer-motion'; // Example of a dependency your components might use

const ComponentDetails2 = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch component data
  const { data: component = {} } = useQuery({
    queryKey: ['component', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/component/${id}`);
      return res.data;
    }
  });

  // Prism highlight on component code change
  useEffect(() => {
    Prism.highlightAll();
  }, [component?.componentCode]);

  // Copy code to clipboard
  const copyCodeToClipboard = () => {
    const code = component?.componentCode || '';
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  // Improved code preparation for live preview
  const prepareLiveCode = (code = '') => {
    if (!code) return '// Loading component...';

    // Remove import statements (they're handled by the scope)
    let cleanedCode = code.replace(/^import .*?from '.*?';\n/gm, '');

    // Handle default exports
    if (cleanedCode.includes('export default')) {
      // Case 1: export default function
      if (cleanedCode.includes('export default function')) {
        cleanedCode = cleanedCode
          .replace('export default function', 'function')
          .concat('\nrender(<Component />);');
      }
      // Case 2: export default () =>
      else if (cleanedCode.includes('export default () =>')) {
        cleanedCode = cleanedCode
          .replace('export default () =>', 'const Component = () =>')
          .concat('\nrender(<Component />);');
      }
      // Case 3: export default with declaration
      else {
        cleanedCode = cleanedCode
          .replace('export default', 'const Component =')
          .concat('\nrender(<Component />);');
      }
    }
    // Handle named exports
    else if (cleanedCode.match(/export (?:const|function) (\w+)/)) {
      const componentName = cleanedCode.match(/export (?:const|function) (\w+)/)[1];
      cleanedCode = cleanedCode
        .replace(`export ${componentName.includes('function') ? 'function' : 'const'} ${componentName}`,
          `${componentName.includes('function') ? 'function' : 'const'} ${componentName}`)
        .concat(`\nrender(<${componentName} />);`);
    }
    // Handle simple component without exports
    else if (cleanedCode.match(/const (\w+) = \(\) =>/)) {
      const componentName = cleanedCode.match(/const (\w+) = \(\) =>/)[1];
      cleanedCode = cleanedCode.concat(`\nrender(<${componentName} />);`);
    }
    // Fallback - just wrap in render()
    else {
      cleanedCode = `const Component = () => {\n${cleanedCode}\n};\nrender(<Component />);`;
    }

    return cleanedCode;
  };

  // Define all dependencies your components might need
  const scope = {
    React,
    motion,
    // Add other dependencies here as needed
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Frontend Component Details</title>
      </Helmet>

      <p className="text-3xl bg-ashUi_primary font-bold text-center text-white py-5 mb-20">
        Frontend Related Component
      </p>

      <div className="container mx-auto px-4">
        {/* Component name */}
        <p className="text-4xl my-5 font-bold text-ashUi_primary text-center">
          {component?.componentName}
        </p>

        {/* Image + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <img
              src={component?.imageUrl}
              alt={component?.componentName}
              className="rounded-2xl shadow-lg w-full border"
            />
          </div>
          <div className="p-6 lg:p-10 rounded-2xl border">
            <p className="text-2xl lg:text-3xl font-bold">Description</p>
            <p className="my-5 text-lg lg:text-xl whitespace-pre-wrap">
              {component?.componentDescription}
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
          <LiveProvider
            code={prepareLiveCode(component?.componentCode)}
            scope={scope}
            noInline={true}
          >
            <div className="border rounded-lg p-4 bg-white">
              <LivePreview className="flex justify-center" />
              <LiveError className="text-red-500 mt-2 p-2 bg-red-50 rounded" />
            </div>
          </LiveProvider>
        </section>

        {/* Raw Code + Copy */}
        <section className="my-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Source Code</h2>
            <button
              onClick={copyCodeToClipboard}
              className="bg-ashUi_primary hover:bg-ashUi_secondary text-white px-4 py-2 rounded-md font-bold transition-colors"
            >
              Copy Code
            </button>
          </div>

          <pre className="border rounded-lg overflow-hidden">
            <code className="language-js block p-4 overflow-x-auto">
              {component?.componentCode}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default ComponentDetails2;
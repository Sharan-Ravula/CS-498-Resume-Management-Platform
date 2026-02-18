import { Metadata } from 'next';
import { db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import Link from 'next/link';
import { ActionMenu } from './ActionMenu';
import { Logo } from './Logo';

async function getResumeData(hash: string) {
  try {
    const resumesRef = collection(db, 'resumes');
    const q = query(resumesRef, where('hash', '==', hash));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      url: doc.data().url,
      fileName: doc.data().fileName,
      createdAt: doc.data().createdAt,
    };
  } catch (error) {
    console.error('Error fetching resume:', error);
    return null;
  }
}

type Params = Promise<{hash: string}>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const hash = params.hash;
  return {
    title: hash ? 'View Resume | Hireme.pls' : 'Welcome to Hireme.pls',
    description: 'Easily share and view professional resumes online',
  };
}

export default async function ResumePage(props: { params: Params }) {
  const params = await props.params;
  const hash = params.hash;
  const resumeData = await getResumeData(hash);

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-2 sm:p-4">
        <div className="container max-w-4xl mx-auto">
          <header className="py-3 sm:py-6 mb-4 sm:mb-8">
            <Logo />
          </header>
          
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl font-semibold text-red-500">Resume Not Found</CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-600 mt-2">
                The resume you&apos;re looking for might have been removed or the link is incorrect.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-4 sm:pb-6">
              <Link href="/upload">
                <Button variant="outline" className="text-sm sm:text-base border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-0 sm:p-4">
      <div className="container max-w-5xl mx-auto">
        <header className="py-3 sm:py-6 mb-4 sm:mb-8">
          <Logo />
        </header>
        
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm relative">
          <ActionMenu url={resumeData.url} hash={hash} />
          <CardHeader className="border-b border-slate-100 p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <CardDescription className="text-xs sm:text-sm text-slate-500">
                Uploaded {new Date(resumeData.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              src={resumeData.url}
              className="w-full h-[800px] border-0"
              title="Resume Preview"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// import { Metadata } from 'next';
// import { db } from '../../lib/firebaseConfig';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Upload, Briefcase, Menu, Download, Trash2 } from 'lucide-react';
// import Link from 'next/link';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { handleDeleteResume } from '@/lib/utils';
// import { toast } from '@/components/ui/use-toast';

// const Logo = () => (
//   <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
//     <div className="flex justify-center items-center">
//       <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-50 rounded-full flex items-center justify-center">
//         <Briefcase className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
//       </div>
//       <div className='text-gray-600 font-bold text-sm sm:text-base ml-2'>Hireme.pls</div>
//     </div>
//   </Link>
// );

// async function getResumeData(hash: string) {
//   try {
//     const resumesRef = collection(db, 'resumes');
//     const q = query(resumesRef, where('hash', '==', hash));
//     const querySnapshot = await getDocs(q);
    
//     if (querySnapshot.empty) {
//       return null;
//     }

//     const doc = querySnapshot.docs[0];
//     return {
//       url: doc.data().url,
//       fileName: doc.data().fileName,
//       createdAt: doc.data().createdAt,
//     };
//   } catch (error) {
//     console.error('Error fetching resume:', error);
//     return null;
//   }
// }

// type Params = Promise<{hash: string}>

// export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
//   const params = await props.params;
//   const hash = params.hash;
//   return {
//     title: hash ? 'View Resume | Hireme.pls' : 'Welcome to Hireme.pls',
//     description: 'Easily share and view professional resumes online',
//   };
// }

// export default async function ResumePage(props: { params: Params }) {
//   const params = await props.params;
//   const hash = params.hash;
//   const resumeData = await getResumeData(hash);


//   const handleDelete = async (hash: string) => {
//     const deletionCode = prompt("Please enter the deletion code:");
//     if (!deletionCode) return;

//     try {
//       await handleDeleteResume(hash, deletionCode);
//       toast({
//         title: "Success",
//         description: "Resume deleted successfully.",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to delete the resume.",
//       });
//     }
//   };

//   const ActionMenu = ({ url }: { url: string }) => (
//     <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//             <Menu className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className='bg-white' align="end">
//           <DropdownMenuItem asChild>
//             <Link href="/upload" className="cursor-pointer">
//               <Upload className="h-4 w-4 mr-2" />
//               Upload New Resume
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => handleDelete(hash)}
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete this Resume
//           </DropdownMenuItem>
//           {/* <DropdownMenuItem asChild>
//             <a href={url} download className="cursor-pointer">
//               <Download className="h-4 w-4 mr-2" />
//               Download Resume
//             </a>
//           </DropdownMenuItem> */}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );

//   if (!resumeData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-2 sm:p-4">
//         <div className="container max-w-4xl mx-auto">
//           <header className="py-3 sm:py-6 mb-4 sm:mb-8">
//             <Logo />
//           </header>
          
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="text-center pb-4 sm:pb-6">
//               <CardTitle className="text-lg sm:text-xl font-semibold text-red-500">Resume Not Found</CardTitle>
//               <CardDescription className="text-sm sm:text-base text-slate-600 mt-2">
//                 The resume you&apos;re looking for might have been removed or the link is incorrect.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-center pb-4 sm:pb-6">
//               <Link href="/upload">
//                 <Button variant="outline" className="text-sm sm:text-base border-slate-200 hover:border-slate-300 hover:bg-slate-50">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Upload New Resume
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-0 sm:p-4">
//       <div className="container max-w-5xl mx-auto">
//         <header className="py-3 sm:py-6 mb-4 sm:mb-8">
//           <Logo />
//         </header>
        
//         <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm relative">
//           <ActionMenu url={resumeData.url} />
//           <CardHeader className="border-b border-slate-100 p-3 sm:p-6">
//             <div className="flex items-center gap-2 sm:gap-3">
//               <CardDescription className="text-xs sm:text-sm text-slate-500">
//                 Uploaded {new Date(resumeData.createdAt).toLocaleDateString()}
//               </CardDescription>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <iframe
//               src={resumeData.url}
//               className="w-full h-[800px] border-0"
//               title="Resume Preview"
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import { Metadata } from 'next';
// import { db } from '../../lib/firebaseConfig';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Upload, Briefcase } from 'lucide-react';
// import Link from 'next/link';


// // Logo component remains the same  
// const Logo = () => (
//   <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
//     <div className="flex justify-center items-center">
//       <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
//         <Briefcase className="h-6 w-6 text-blue-500" />
//       </div>
//       <div className='text-gray-600 font-bold ml-2'>Hireme.pls</div>
//     </div>
//   </Link>
// );

// // Server-side data fetching remains the same
// async function getResumeData(hash: string) {
//   try {
//     const resumesRef = collection(db, 'resumes');
//     const q = query(resumesRef, where('hash', '==', hash));
//     const querySnapshot = await getDocs(q);
    
//     if (querySnapshot.empty) {
//       return null;
//     }

//     const doc = querySnapshot.docs[0];
//     return {
//       url: doc.data().url,
//       fileName: doc.data().fileName,
//       createdAt: doc.data().createdAt,
//     };
//   } catch (error) {
//     console.error('Error fetching resume:', error);
//     return null;
//   }
// }

// type Params = Promise<{hash: string}>

// // Update metadata generation with correct typing
// export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
//   const params = await props.params;
//   const hash = params.hash;
//   return {
//     title: hash ? 'View Resume | Hireme.pls' : 'Welcome to Hireme.pls',
//     description: 'Easily share and view professional resumes online',
//   };
// }


// // Main page component
// export default async function ResumePage(props: { params: Params }) {
//   // const { hash } = params;
//   const params = await props.params;
//   const hash = params.hash;

//   // Fetch resume data
//   const resumeData = await getResumeData(hash);

//   if (!resumeData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
//         <div className="container max-w-4xl mx-auto">
//           <header className="py-6 mb-8">
//             <Logo />
//           </header>
          
//           <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//             <CardHeader className="text-center pb-6">
//               <CardTitle className="text-xl font-semibold text-red-500">Resume Not Found</CardTitle>
//               <CardDescription className="text-slate-600 mt-2">
//                 The resume you&apos;re looking for might have been removed or the link is incorrect.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-center pb-6">
//               <Link href="/upload">
//                 <Button variant="outline" className="border-slate-200 hover:border-slate-300 hover:bg-slate-50">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Upload New Resume
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
//       <div className="container max-w-5xl mx-auto">
//         <header className="py-6 mb-8">
//           <Logo />
//         </header>
        
//         <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
//           <CardHeader className="border-b border-slate-100">
//             <div className="flex items-center gap-3">
//               <div>
//                 <CardDescription className="text-sm text-slate-500">
//                   Uploaded {new Date(resumeData.createdAt).toLocaleDateString()}
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <iframe
//               src={resumeData.url}
//               className="w-full h-[800px] border-0"
//               title="Resume Preview"
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
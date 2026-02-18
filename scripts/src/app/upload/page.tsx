"use client";

import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Link as LinkIcon, File, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import Link from 'next/link';
import { handleDeleteResume } from "@/lib/utils";
import { generateSecureRandomString } from '@/lib/utils';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isDiscoverable, setIsDiscoverable] = useState(false);
  const [deletionCode, setDeletionCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
        });
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const randomStr = Math.random().toString(36).substring(2, 7);
      const hash = `${randomStr}`;
      const newDeletionCode = generateSecureRandomString(16); // Generate a secure random string
      setResumeId(hash);
      setDeletionCode(newDeletionCode);
      
      const storageRef = ref(storage, `resumes/${hash}.pdf`);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, 'resumes'), {
        hash,
        url,
        fileName: file.name,
        createdAt: new Date().toISOString(),
        fileSize: file.size,
        isDiscoverable,
        deletionCode: newDeletionCode, // Store hashed version in production
      });

      const shareableLink = `${window.location.origin}/${hash}`;
      setGeneratedLink(shareableLink);
      
      toast({
        title: "Upload successful!",
        description: "Your resume has been uploaded and is ready to share.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   if (resumeId && deletionCode) {
  //     const userProvidedCode = prompt("Please enter your deletion code to confirm:");
  //     if (userProvidedCode === deletionCode) {
  //       const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
  //       if (confirmDelete) {
  //         try {
  //           await handleDeleteResume(resumeId, deletionCode);
  //           setGeneratedLink(null);
  //           setResumeId(null);
  //           setFile(null);
  //           setDeletionCode(null);
  //           toast({
  //             title: "Success",
  //             description: "Your resume has been deleted.",
  //           });
  //         } catch (error) {
  //           toast({
  //             variant: "destructive",
  //             title: "Error",
  //             description: "Failed to delete the resume. Please try again.",
  //           });
  //         }
  //       }
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: "Invalid Code",
  //         description: "The deletion code you provided is incorrect.",
  //       });
  //     }
  //   }
  // };

  const handleDelete = async () => {
    if (resumeId && deletionCode) {
      const userProvidedCode = prompt("Please enter your deletion code to confirm:");
      if (!userProvidedCode) return; // User cancelled the prompt
  
      try {
        await handleDeleteResume(resumeId, userProvidedCode);
        
        // Clear the state
        setGeneratedLink(null);
        setResumeId(null);
        setFile(null);
        setDeletionCode(null);
        
        toast({
          title: "Success",
          description: "Your resume has been deleted successfully.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete the resume. Please try again.",
        });
      }
    }
  };

  const copyToClipboard = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        toast({
          title: "Link copied!",
          description: "The shareable link has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please copy the link manually.",
        });
        console.log(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="absolute top-4 right-4">
        <Link href="/search">
          <button className="bg-blue-200 text-black py-2 px-4 rounded-md hover:bg-blue-300 transition">
            Search Resumes
          </button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-500" />
            </div>
            <div className='text-gray-600 font-bold ml-2'>Hireme.pls</div>
          </div>
          <CardTitle className="text-xl font-semibold text-center text-slate-800">
            Share Your Resume
          </CardTitle>
          <CardDescription className="text-center text-slate-600">
            Upload your PDF resume and get a shareable link instantly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 border border-gray-200 p-2 rounded-lg bg-gray-100">
            <Label htmlFor="discoverable" className="text-sm font-bold leading-none text-gray-600">
              Searchable
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="discoverable"
                checked={isDiscoverable}
                onCheckedChange={setIsDiscoverable}
                className="[&>span]:data-[state=checked]:bg-blue-500 
                [&>span]:data-[state=unchecked]:bg-gray-400 
                data-[state=unchecked]:bg-white data-[state=checked]:bg-white
                border border-gray-200
                "
                />
              {isDiscoverable ? (
                <Eye className="h-4 w-4 text-slate-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-slate-500" />
              )}
            </div>
          </div>

          <div className="space-y-3">
            {file ? (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-700"
                    onClick={() => setFile(null)}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="resume" className="text-slate-700">
                  Select your resume
                </Label>
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer px-2 p-1 w-full rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-200 text-slate-600"
                />
              </div>
            )}
          </div>
          
          <Button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${loading ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload Resume</span>
              </div>
            )}
          </Button>

          {generatedLink && deletionCode && (
            <Alert className="border-2 border-green-300 rounded-xl p-4">
              <AlertDescription className="flex flex-col gap-3">
                <p className="text-sm font-bold text-gray-600">Your resume is ready to share!</p>
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-grey-200">
                  <span className="text-sm truncate flex-1">
                    <Link href={generatedLink} target='_blank' rel='noopener noreferrer' className="inline-flex items-center gap-2 transition-colors">
                      {generatedLink}
                    </Link>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="shrink-0 border-none rounded-xl bg-gray-400 text-white hover:text-white hover:bg-gray-300"
                  >
                    <LinkIcon className="h-4 w-4 mr-2 text-white" />
                    Copy
                  </Button>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-medium">Deletion Code</p>
                  <p className="text-sm text-yellow-700 font-mono mt-1">{deletionCode}</p>
                  <p className="text-xs text-yellow-600 mt-1">Save this code - you will need it to delete your resume later.</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="mt-3 bg-red-500 text-white hover:bg-red-600"
                >
                  Delete Resume
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
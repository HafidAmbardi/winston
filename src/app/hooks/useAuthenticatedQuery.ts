import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/auth_context';
import { Query, DocumentData, QuerySnapshot, DocumentSnapshot, getDocs } from 'firebase/firestore';

export function useAuthenticatedQuery<T = DocumentData>(
  queryFn: () => Query<T> | null,
  options: {
    onError?: (error: Error) => void;
  } = {}
) {
  const { user, loading } = useAuth();
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      console.log('Auth state is loading...');
      return;
    }

    if (!user) {
      console.log('No authenticated user found');
      setError(new Error('Authentication required'));
      setIsLoading(false);
      return;
    }

    console.log('User authenticated:', user.uid);

    const fetchData = async () => {
      try {
        const query = queryFn();
        if (!query) {
          console.log('No query provided');
          setData(null);
          setIsLoading(false);
          return;
        }

        console.log('Executing Firestore query...');
        const snapshot: QuerySnapshot<T> = await getDocs(query);
        console.log('Query successful, documents:', snapshot.size);

        const results = snapshot.docs.map((doc: DocumentSnapshot<T>) => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setData(results);
        setError(null);
      } catch (err) {
        console.error('Firestore query error:', err);
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, loading, queryFn, options.onError]);

  return {
    data,
    error,
    isLoading,
    isAuthenticated: !!user,
    userId: user?.uid
  };
} 
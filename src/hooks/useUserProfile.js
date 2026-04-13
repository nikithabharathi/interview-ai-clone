import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useUserProfile(userEmail) {
  const queryClient = useQueryClient();

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['userProfile', userEmail],
    queryFn: () => base44.entities.UserProfile.filter({ user_email: userEmail }),
    enabled: !!userEmail,
  });

  const profile = profiles?.[0] || null;

  const upsertProfile = useMutation({
    mutationFn: async (data) => {
      if (profile) {
        return base44.entities.UserProfile.update(profile.id, data);
      }
      return base44.entities.UserProfile.create({ user_email: userEmail, ...data });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userProfile', userEmail] }),
  });

  return { profile, isLoading, upsertProfile };
}
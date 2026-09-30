"use client"

import { Card } from "@/components/ui/card"
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
export default function profile() {

    const { data: profile, isLoading, error } = useProfile();
    const { mutate: updateProfile, isPending, isError, isSuccess } = useUpdateProfile();

    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name ?? "");
            setXHandle(profile.x_handle ?? "");
            setAvatarUrl(profile.avatar_url ?? "");
        }
    }, [profile]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ displayName, xHandle, avatarUrl });
    };

    const [displayName, setDisplayName] = useState("");
    const [xHandle, setXHandle] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    return (
        <>


            <Card className="m-5 text-left md:mt-20 md:ml-5 lg:mt-20 lg:ml-5">
    <div className="flex flex-col gap-3 px-5">
        <h4 className="t-h2">Profile</h4>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Display Name</span>
            <span className="n truncate">{profile?.display_name ?? "Not Found"}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Avatar</span>
            <span className="n truncate max-w-60">{profile?.avatar_url ?? "Not Found"}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Banner</span>
            <span className="n truncate">{profile?.banner_url ?? "Not Found"}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">X Handle</span>
            <span className="n truncate">{profile?.x_handle ?? "Not Found"}</span>
        </div>
    </div>

    <div className="flex flex-col gap-3 px-5">
        <h4 className="t-h2">Subscription</h4>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Subscription</span>
            <span className="n truncate">{profile?.subscription_tier}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Subscription Status</span>
            <span className="n truncate">{profile?.subscription_status}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Billing Cycle</span>
            <span className="n truncate">{profile?.billing_cycle ?? "Not Available"}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Referral Code</span>
            <span className="n truncate">{profile?.referral_code ?? "Not Found"}</span>
        </div>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Referred By</span>
            <span className="n truncate">{profile?.referred_by ?? "None"}</span>
        </div>
    </div>

    <div className="flex flex-col gap-3 px-5">
        <h4 className="t-h2">Account</h4>

        <div className="flex flex-col gap-0.5">
            <span className="t-ui">Email</span>
            <span className="n truncate">{profile?.email}</span>
        </div>
    </div>
</Card>


            <Card className="m-5 text-left mb-20">
                <h2 className="t-h2 ml-5">Update Profile</h2>
                <span className="t-ui ml-5">Update Your Profile Information</span>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <FieldLabel className="ml-5">Display Name</FieldLabel>
                        <Input
                            className="ml-5 max-w-60"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel className="ml-5">X Handle</FieldLabel>
                        <Input
                            className="ml-5 max-w-60"
                            value={xHandle}
                            onChange={(e) => setXHandle(e.target.value)}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel className="ml-5">Avatar URL</FieldLabel>
                        <Input
                            className="ml-5 max-w-60"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                        />
                    </FieldGroup>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="t-ui ml-5 mt-3 bg-primary text-primary-foreground rounded-md px-4 py-2 disabled:opacity-50"
                    >
                        {isPending ? "Saving..." : "Save changes"}
                    </button>

                    {isError && <p className="t-meta text-negative ml-5 mt-2">Something went wrong — try again.</p>}
                    {isSuccess && <p className="t-meta text-positive ml-5 mt-2">Saved.</p>}
                </form>
            </Card>
        </>
    )
}
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Edit01 } from "@untitledui/icons";
import { MenuContext } from "../../context/MenuContext";
import { Card, PageHeader } from "@/components/ui/page";
import { DetailList } from "@/components/ui/form";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";
import { adminPath } from "@/utils/admin-path";

/** Read-only detail screen at /:id. */
const CrudView = ({ config }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentPagePermissions } = useContext(MenuContext);
    const basePath = adminPath(config.path);
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        config.api
            .getById(id)
            .then((res) => setRecord(res.data?.data ?? null))
            .catch((err) => {
                console.log(err);
                toast.error(`Failed to fetch ${config.singular.toLowerCase()} details`);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // The form's own field list doubles as the view's, unless overridden.
    const items = (config.viewFields ?? config.fields.filter((f) => !f.hideIn?.includes("view"))).map((field) => {
        const raw = config.toView ? config.toView(record)[field.name] : record?.[field.name];
        let value = raw;

        if (field.type === "checkbox") {
            value = <Badge color={raw ? "success" : "gray"}>{raw ? "Yes" : "No"}</Badge>;
        } else if (field.type === "password") {
            return null;
        }

        return { label: field.label, value, full: field.full || field.type === "textarea" };
    }).filter(Boolean);

    const title = record ? (config.recordTitle?.(record) ?? config.singular) : config.singular;

    document.title = `${title} | Techno Sales Admin`;

    return (
        <>
            <PageHeader
                title={title}
                pageTitle={config.plural}
                pageHref={basePath}
                actions={
                    currentPagePermissions.edit && record ? (
                        <Button iconLeading={Edit01} onClick={() => navigate(`${basePath}/${id}/edit`)}>
                            Edit
                        </Button>
                    ) : null
                }
            />

            <Card className="p-5 md:p-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <LoadingIndicator type="dot-circle" size="md" />
                    </div>
                ) : !record ? (
                    <p className="py-12 text-center text-sm text-tertiary">This {config.singular.toLowerCase()} could not be found.</p>
                ) : (
                    <DetailList items={items} />
                )}
            </Card>
        </>
    );
};

export default CrudView;

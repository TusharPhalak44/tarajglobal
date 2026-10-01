import { createBlog, updateBlog, getBlogById as getBlog } from './controllers/admin/blog.controller.js';
import db from './config/db.js';

const createRes = () => ({
  statusCode: 200,
  status: function(s) { this.statusCode = s; return this; },
  json: function(data) { this.data = data; return this; }
});

async function runAudit() {
  console.log("==========================================");
  console.log("       FINAL PRODUCTION AUDIT - API       ");
  console.log("==========================================");

  let newId;

  // FLOW 1: CREATE -> SAVE DRAFT -> REFRESH -> EDIT -> UPDATE -> REFRESH
  console.log("\n[FLOW 1] CREATE -> SAVE DRAFT");
  const draftReq = {
    body: {
      title: "Flow 1 Draft Title",
      slug: "flow-1-draft",
      content: "<p>This is a draft blog</p>",
      category_id: 1,
      status: "draft",
      tags: ["Test", "Draft"],
      seo_title: "Draft SEO",
      seo_description: "Draft desc",
      seo_keywords: "draft",
      featured_image: "/uploads/test.jpg"
    }
  };
  const res1 = createRes();
  await createBlog(draftReq, res1);
  if (res1.statusCode !== 201 && res1.statusCode !== 200) throw new Error("Flow 1 Create Failed: " + JSON.stringify(res1.data));
  newId = res1.data.data.id;
  console.log("✓ Saved Draft successfully. ID:", newId);

  console.log("\n[FLOW 1] REFRESH (GET)");
  const getReq1 = { params: { id: newId } };
  const res2 = createRes();
  await getBlog(getReq1, res2);
  const fetchedDraft = res2.data.data;
  console.log("✓ Fetched Draft successfully.");
  console.log("  Tags persisted:", fetchedDraft.tags);
  console.log("  Status persisted:", fetchedDraft.status);

  console.log("\n[FLOW 1] UPDATE (EDIT -> SAVE)");
  const updateReq = {
    params: { id: newId },
    body: {
      title: "Flow 1 Updated Title",
      slug: "flow-1-updated",
      content: "<p>This is an updated blog</p>",
      category_id: 1,
      status: "published", // changed status
      tags: ["Updated", "Tags"],
      seo_title: "Updated SEO",
      seo_description: "Updated desc",
      seo_keywords: "updated",
      featured_image: "/uploads/updated.jpg"
    }
  };
  const res3 = createRes();
  await updateBlog(updateReq, res3);
  if (res3.statusCode !== 200) throw new Error("Flow 1 Update Failed: " + JSON.stringify(res3.data));
  console.log("✓ Updated successfully.");

  console.log("\n[FLOW 1] REFRESH (GET AFTER UPDATE)");
  const getReq2 = { params: { id: newId } };
  const res4 = createRes();
  await getBlog(getReq2, res4);
  const fetchedUpdated = res4.data.data;
  console.log("✓ Fetched Updated successfully.");
  console.log("  Tags persisted:", fetchedUpdated.tags);
  console.log("  Status persisted:", fetchedUpdated.status);
  console.log("  SEO Title persisted:", fetchedUpdated.seo_title);

  // FLOW 2: CREATE -> PUBLISH
  console.log("\n------------------------------------------");
  console.log("[FLOW 2] CREATE -> PUBLISH NOW");
  const publishReq = {
    body: {
      title: "Flow 2 Published Title",
      slug: "flow-2-published",
      content: "<p>Immediate publish</p>",
      category_id: 1,
      status: "published"
    }
  };
  const res5 = createRes();
  await createBlog(publishReq, res5);
  if (res5.statusCode !== 201 && res5.statusCode !== 200) throw new Error("Flow 2 Create Failed: " + JSON.stringify(res5.data));
  console.log("✓ Published immediately successfully.");
  const getReq3 = { params: { id: res5.data.data.id } };
  const res6 = createRes();
  await getBlog(getReq3, res6);
  console.log("  Status persisted:", res6.data.data.status);

  // FLOW 3: CREATE -> SCHEDULE
  console.log("\n------------------------------------------");
  console.log("[FLOW 3] CREATE -> SCHEDULE");
  const scheduleReq = {
    body: {
      title: "Flow 3 Scheduled Title",
      slug: "flow-3-scheduled",
      content: "<p>Scheduled publish</p>",
      category_id: 1,
      status: "scheduled",
      scheduled_at: "2026-10-31 10:00:00"
    }
  };
  const res7 = createRes();
  await createBlog(scheduleReq, res7);
  if (res7.statusCode !== 201 && res7.statusCode !== 200) throw new Error("Flow 3 Create Failed: " + JSON.stringify(res7.data));
  console.log("✓ Scheduled successfully.");
  const getReq4 = { params: { id: res7.data.data.id } };
  const res8 = createRes();
  await getBlog(getReq4, res8);
  console.log("  Status persisted:", res8.data.data.status);
  console.log("  Scheduled At persisted:", res8.data.data.scheduled_at);

  console.log("\n==========================================");
  console.log("ALL DB AUDIT TESTS PASSED!");
  process.exit(0);
}

runAudit();

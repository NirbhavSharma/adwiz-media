insert into services (slug, name, description, icon_name)
values
  ('social-media-management', 'Social Media Management', 'Monthly content planning, creative production, publishing, engagement, and reporting.', 'Share2'),
  ('online-presence-setup', 'Online Presence Setup', 'Profile optimization, brand messaging, visual direction, and launch-ready platform setup.', 'Sparkles'),
  ('reach-campaigns', 'Reach Campaigns', 'Organic and paid campaign planning for visibility, enquiries, and lead generation.', 'Megaphone'),
  ('growth-analytics', 'Growth Analytics', 'KPI reporting and monthly recommendations for improving reach, content, and campaigns.', 'LineChart')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon_name = excluded.icon_name;

insert into packages (slug, name, summary, starting_price_inr, features)
values
  ('presence', 'Presence', 'For brands that need a professional online foundation.', null, '["Profile setup", "Brand messaging", "12 content pieces", "Monthly report"]'),
  ('growth', 'Growth', 'For businesses ready for consistent social media management.', null, '["Content calendar", "20 content pieces", "Community support", "Campaign planning"]'),
  ('scale', 'Scale', 'For teams that need full marketing support and stronger lead flow.', null, '["Paid campaign support", "30+ content pieces", "Analytics dashboard", "Priority strategy"]')
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary,
  starting_price_inr = excluded.starting_price_inr,
  features = excluded.features;

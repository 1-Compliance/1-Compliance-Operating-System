CREATE TABLE IF NOT EXISTS scan_leads (
  email_hash TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  company TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'scanning', 'completed')),
  pending_url TEXT,
  verification_code_hash TEXT,
  verification_expires_at TIMESTAMPTZ,
  verification_attempts INTEGER NOT NULL DEFAULT 0,
  request_ip_hash TEXT,
  code_sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scanned_at TIMESTAMPTZ,
  CHECK (status <> 'completed' OR scanned_at IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS scan_code_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email_hash TEXT NOT NULL,
  request_ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS scan_code_requests_email_created_idx
  ON scan_code_requests (email_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS scan_code_requests_ip_created_idx
  ON scan_code_requests (request_ip_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS scan_code_requests_created_idx
  ON scan_code_requests (created_at);

CREATE TABLE IF NOT EXISTS scan_entitlements (
  email_hash TEXT PRIMARY KEY,
  tier TEXT NOT NULL CHECK (tier IN ('starter', 'professional', 'enterprise', 'enterprise-plus')),
  monthly_scan_limit INTEGER CHECK (monthly_scan_limit IS NULL OR monthly_scan_limit > 0),
  max_domains INTEGER CHECK (max_domains IS NULL OR max_domains > 0),
  approved_by TEXT NOT NULL,
  approved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  CHECK ((tier = 'enterprise-plus') = (monthly_scan_limit IS NULL AND max_domains IS NULL))
);

CREATE INDEX IF NOT EXISTS scan_entitlements_expires_idx
  ON scan_entitlements (expires_at);

CREATE TABLE IF NOT EXISTS scan_entitlement_usage (
  email_hash TEXT NOT NULL REFERENCES scan_entitlements (email_hash) ON DELETE CASCADE,
  month_start DATE NOT NULL,
  scans_used INTEGER NOT NULL DEFAULT 0 CHECK (scans_used >= 0),
  PRIMARY KEY (email_hash, month_start)
);

CREATE TABLE IF NOT EXISTS scan_entitlement_domains (
  email_hash TEXT NOT NULL REFERENCES scan_entitlements (email_hash) ON DELETE CASCADE,
  domain_hash TEXT NOT NULL,
  first_scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (email_hash, domain_hash)
);

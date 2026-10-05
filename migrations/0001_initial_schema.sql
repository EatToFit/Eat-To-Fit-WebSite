PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  auth_provider_id TEXT NOT NULL UNIQUE,

  username TEXT NOT NULL,
  username_normalized TEXT NOT NULL UNIQUE,

  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,

  role TEXT NOT NULL
    CHECK (role IN ('CLIENT', 'ADMIN')),

  account_status TEXT NOT NULL
    CHECK (account_status IN ('PENDING', 'ACTIVE', 'SUSPENDED')),

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  approved_at TEXT,
  suspended_at TEXT,
  last_seen_at TEXT
);

CREATE INDEX idx_users_role
  ON users(role);

CREATE INDEX idx_users_account_status
  ON users(account_status);


CREATE TABLE client_profiles (
  id TEXT PRIMARY KEY,

  user_id TEXT NOT NULL UNIQUE,

  first_name TEXT,
  last_name TEXT,
  phone_e164 TEXT,
  registration_code TEXT,

  questionnaire_status TEXT NOT NULL DEFAULT 'NOT_RECEIVED'
    CHECK (
      questionnaire_status IN (
        'NOT_RECEIVED',
        'RECEIVED',
        'REVIEWED'
      )
    ),

  questionnaire_received_at TEXT,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_client_profiles_phone_e164
  ON client_profiles(phone_e164);

CREATE INDEX idx_client_profiles_registration_code
  ON client_profiles(registration_code);


CREATE TABLE meal_plans (
  id TEXT PRIMARY KEY,

  user_id TEXT NOT NULL,

  public_id TEXT NOT NULL UNIQUE,

  title TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,

  html_content TEXT NOT NULL,

  status TEXT NOT NULL
    CHECK (
      status IN (
        'DRAFT',
        'PUBLISHED',
        'ARCHIVED'
      )
    ),

  is_current INTEGER NOT NULL DEFAULT 0
    CHECK (is_current IN (0, 1)),

  created_at TEXT NOT NULL,
  published_at TEXT,
  archived_at TEXT,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_meal_plans_user_id
  ON meal_plans(user_id);

CREATE INDEX idx_meal_plans_status
  ON meal_plans(status);

CREATE INDEX idx_meal_plans_current
  ON meal_plans(user_id, is_current);


CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,

  actor_user_id TEXT,
  target_user_id TEXT,

  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,

  created_at TEXT NOT NULL,

  FOREIGN KEY (actor_user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,

  FOREIGN KEY (target_user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE INDEX idx_audit_log_actor
  ON audit_log(actor_user_id);

CREATE INDEX idx_audit_log_target
  ON audit_log(target_user_id);

CREATE INDEX idx_audit_log_entity
  ON audit_log(entity_type, entity_id);

CREATE INDEX idx_audit_log_created_at
  ON audit_log(created_at);
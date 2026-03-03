#!/usr/bin/env python3
"""
AR Academy Backend API Test Suite
Tests all backend endpoints for functionality
"""

import asyncio
import aiohttp
import json
from datetime import datetime
import sys
import os

# Base URL from frontend environment
BASE_URL = "https://ar-stem-interactive.preview.emergentagent.com/api"

class ARTestSuite:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = None
        self.test_user_id = None
        self.auth_token = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            connector=aiohttp.TCPConnector(ssl=False)
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def test_health(self):
        """Test health endpoint"""
        print("🏥 Testing Health Check...")
        try:
            async with self.session.get(f"{self.base_url}/health") as resp:
                if resp.status == 200:
                    data = await resp.json()
                    print(f"✅ Health check passed: {data}")
                    return True, data
                else:
                    print(f"❌ Health check failed with status: {resp.status}")
                    text = await resp.text()
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ Health check error: {str(e)}")
            return False, str(e)
    
    async def test_subjects(self):
        """Test subjects endpoint"""
        print("📚 Testing Subjects...")
        try:
            async with self.session.get(f"{self.base_url}/subjects") as resp:
                if resp.status == 200:
                    data = await resp.json()
                    expected_subjects = ["physics", "biology", "chemistry"]
                    found_subjects = [s["id"] for s in data]
                    
                    if all(subj in found_subjects for subj in expected_subjects):
                        print(f"✅ Subjects test passed: Found {len(data)} subjects")
                        return True, data
                    else:
                        print(f"❌ Missing subjects. Expected: {expected_subjects}, Found: {found_subjects}")
                        return False, f"Missing subjects: {set(expected_subjects) - set(found_subjects)}"
                else:
                    print(f"❌ Subjects test failed with status: {resp.status}")
                    text = await resp.text()
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ Subjects test error: {str(e)}")
            return False, str(e)
    
    async def test_simulations(self):
        """Test simulations endpoints"""
        print("🧪 Testing Simulations...")
        try:
            # Test all simulations
            async with self.session.get(f"{self.base_url}/simulations") as resp:
                if resp.status != 200:
                    text = await resp.text()
                    return False, f"All simulations failed. Status: {resp.status}, Response: {text}"
                
                simulations = await resp.json()
                print(f"✅ Found {len(simulations)} simulations")
                
            # Test single simulation (projectile_motion)
            async with self.session.get(f"{self.base_url}/simulations/projectile_motion") as resp:
                if resp.status == 200:
                    sim_data = await resp.json()
                    print(f"✅ Single simulation test passed: {sim_data['name']}")
                    return True, {"all_sims": len(simulations), "single_sim": sim_data}
                else:
                    text = await resp.text()
                    return False, f"Single simulation failed. Status: {resp.status}, Response: {text}"
                    
        except Exception as e:
            print(f"❌ Simulations test error: {str(e)}")
            return False, str(e)
    
    async def test_auth_register(self):
        """Test user registration"""
        print("👤 Testing User Registration...")
        try:
            # Use realistic test data
            test_data = {
                "email": "sarah.physics@arkademy.com",
                "name": "Sarah Physicist", 
                "password": "secure123!"
            }
            
            headers = {'Content-Type': 'application/json'}
            async with self.session.post(
                f"{self.base_url}/auth/register",
                json=test_data,
                headers=headers
            ) as resp:
                if resp.status == 200:
                    user_data = await resp.json()
                    self.test_user_id = user_data["id"]
                    print(f"✅ Registration successful: User ID {self.test_user_id}")
                    return True, user_data
                else:
                    text = await resp.text()
                    print(f"❌ Registration failed. Status: {resp.status}, Response: {text}")
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ Registration error: {str(e)}")
            return False, str(e)
    
    async def test_auth_login(self):
        """Test user login"""
        print("🔐 Testing User Login...")
        try:
            login_data = {
                "email": "sarah.physics@arkademy.com",
                "password": "secure123!"
            }
            
            headers = {'Content-Type': 'application/json'}
            async with self.session.post(
                f"{self.base_url}/auth/login",
                json=login_data,
                headers=headers
            ) as resp:
                if resp.status == 200:
                    user_data = await resp.json()
                    if not self.test_user_id:
                        self.test_user_id = user_data["id"]
                    print(f"✅ Login successful: {user_data['email']}")
                    return True, user_data
                else:
                    text = await resp.text()
                    print(f"❌ Login failed. Status: {resp.status}, Response: {text}")
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ Login error: {str(e)}")
            return False, str(e)
    
    async def test_user_stats(self):
        """Test user stats endpoint"""
        print("📊 Testing User Stats...")
        if not self.test_user_id:
            return False, "No user ID available for stats testing"
            
        try:
            async with self.session.get(f"{self.base_url}/progress/{self.test_user_id}/stats") as resp:
                if resp.status == 200:
                    stats_data = await resp.json()
                    print(f"✅ Stats retrieved: {stats_data['completion_percentage']}% completion")
                    return True, stats_data
                else:
                    text = await resp.text()
                    print(f"❌ Stats failed. Status: {resp.status}, Response: {text}")
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ Stats error: {str(e)}")
            return False, str(e)
    
    async def test_ai_chat(self):
        """Test AI chat functionality"""
        print("🤖 Testing AI Chat...")
        if not self.test_user_id:
            return False, "No user ID available for chat testing"
            
        try:
            chat_data = {
                "user_id": self.test_user_id,
                "message": "Newton yasalarını açıkla",
                "subject": "physics"
            }
            
            headers = {'Content-Type': 'application/json'}
            async with self.session.post(
                f"{self.base_url}/chat",
                json=chat_data,
                headers=headers
            ) as resp:
                if resp.status == 200:
                    response_data = await resp.json()
                    chat_response = response_data.get("response", "")
                    print(f"✅ AI Chat successful. Response length: {len(chat_response)} chars")
                    print(f"   Sample response: {chat_response[:100]}...")
                    return True, response_data
                else:
                    text = await resp.text()
                    print(f"❌ AI Chat failed. Status: {resp.status}, Response: {text}")
                    return False, f"Status: {resp.status}, Response: {text}"
        except Exception as e:
            print(f"❌ AI Chat error: {str(e)}")
            return False, str(e)

async def run_tests():
    """Run all backend tests"""
    print("🚀 Starting AR Academy Backend Test Suite")
    print(f"🔗 Base URL: {BASE_URL}")
    print("=" * 60)
    
    results = {}
    
    async with ARTestSuite() as test_suite:
        # Test each endpoint
        tests = [
            ("health", test_suite.test_health),
            ("subjects", test_suite.test_subjects),
            ("simulations", test_suite.test_simulations),
            ("auth_register", test_suite.test_auth_register),
            ("auth_login", test_suite.test_auth_login),
            ("user_stats", test_suite.test_user_stats),
            ("ai_chat", test_suite.test_ai_chat)
        ]
        
        for test_name, test_func in tests:
            try:
                success, data = await test_func()
                results[test_name] = {
                    "success": success,
                    "data": data,
                    "timestamp": datetime.utcnow().isoformat()
                }
            except Exception as e:
                results[test_name] = {
                    "success": False,
                    "data": str(e),
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            print()  # Add spacing between tests
    
    print("=" * 60)
    print("📋 Test Summary:")
    
    passed = sum(1 for r in results.values() if r["success"])
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result["success"] else "❌ FAIL"
        print(f"{status} {test_name}")
        if not result["success"]:
            print(f"    Error: {result['data']}")
    
    print(f"\n🎯 Overall: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    return results

if __name__ == "__main__":
    results = asyncio.run(run_tests())
    
    # Exit with error code if any tests failed
    failed_tests = [name for name, result in results.items() if not result["success"]]
    if failed_tests:
        print(f"\n❌ Failed tests: {', '.join(failed_tests)}")
        sys.exit(1)
    else:
        print("\n✅ All tests passed!")
        sys.exit(0)